import uuid
import time
import traceback
from flask import Flask, request, Response
from flask_cors import CORS

from commons.store import create_store, Storage
from commons.logger import get_logger
from commons.dictionary import Dictionary

EXPIRATION = 1800000000000

app = Flask(__name__)
CORS(app)

logger = get_logger("RecipesManager")


@app.route('/api', methods=['GET'])
def health():
    return "UP"


@app.route('/api/auth/providers/local-userpass/login', methods=['POST'])
def login():
    logger.debug("login", f"Received reqeust. Body: {request.get_json()} headers: {request.headers}")
    try:
        _remove_expired_tokens()
        content = request.get_json()
        username = content['username']
        user = _get_user(username)
        if user is None:
            message = f"User or password {username} incorrect."
            logger.info("login", message)
            return Response(message, status=403)
        password = content['password']
        if user['password'] != password:
            message = f"User or password {username} incorrect."
            logger.info("login", message)
            return Response(message, status=403)
        return _create_token()
    except Exception as e:
        return _internal_server_error(e)


def _create_token():
    token = {
        "access_token": str(uuid.uuid4()),
        "refresh_token": str(uuid.uuid4()),
        "time": time.time_ns()
    }
    store = create_store(Storage.JSON)
    tokens = store.load(lambda: [], "tokens")
    tokens.append(token)
    store.store(tokens, "tokens")
    logger.info("login", f"Created token {token}")
    return token


def _get_user(username):
    logger.info("login", f"Login {username}")
    store = create_store(Storage.JSON)
    if not store.exist("users"):
        return
    users: [] = store.load(lambda: [], "users")
    filtered_users = list(filter(lambda x: x['username'] == username, users))
    if len(filtered_users) == 0:
        return
    user = filtered_users[0]
    logger.info("login", f"{user['username']} found.")
    return user


@app.route('/api/auth/session', methods=['POST'])
def refresh():
    logger.debug("refresh", f"Received reqeust. Body: {request.get_json()} headers: {request.headers}")
    refresh_token = _get_authorization_token(request.headers)
    store = create_store(Storage.JSON)
    tokens = store.load(lambda: [], "tokens")
    filtered_tokens = list(filter(lambda x: x['refresh_token'] == refresh_token, tokens))
    if len(filtered_tokens) == 0:
        message = f"Refresh token {refresh_token} not found"
        logger.info("refresh", message)
        return Response(message, status=404)
    now = time.time_ns()
    logger.info("refresh", f"Prolongate token to {now} ")
    filtered_tokens[0]['time'] = now
    store.store(tokens, "tokens")
    return {"access_token": filtered_tokens[0]['access_token']}


@app.route('/api/data/v1/action/findOne', methods=['POST'])
def find_one():
    logger.debug("find_one", f"Received reqeust. Body: {request.get_json()} headers: {request.headers}")
    if not _authorized(request.headers):
        message = "Not authorized"
        return Response(message, status=401)
    try:
        content = request.get_json()
        token = content['filter']['token']
        projection = content['projection']
        logger.info("find_one", f"Find {token}, return {projection}")
        store = create_store(Storage.JSON)
        resource = Dictionary(store.load(lambda: {}, token))
        document = {}
        for key in projection:
            content = resource.get(key).content
            nested = document
            parts = key.split(".")
            i = 0
            size = len(parts)
            for part in parts:
                if part not in nested:
                    if i == size - 1:
                        nested[part] = content
                    else:
                        nested[part] = {}
                nested = nested[part]
                i += 1
        return {"document": document}
    except Exception as e:
        return _internal_server_error(e)



@app.route('/api/data/v1/action/updateOne', methods=['POST'])
def update_one():
    logger.debug("update_one", f"Received reqeust. Body: {request.get_json()} headers: {request.headers}")
    if not _authorized(request.headers):
        message = "Not authorized"
        return Response(message, status=401)
    try:
        content = request.get_json()
        store = create_store(Storage.JSON)
        token = content['filter']['token']
        resource = Dictionary(store.load(lambda: {}, token))
        _set(content, token, resource, store)
        _unset(content, token, resource, store)
        return {}
    except Exception as e:
        return _internal_server_error(e)



def _unset(content, token, resource, store):
    if '$unset' in content['update']:
        set_values = content['update']['$unset']
        for value in set_values:
            resource.delete(value)
        store.store(resource.content, token)


def _set(content, token, resource, store):
    if '$set' in content['update']:
        set_values = content['update']['$set']
        for value in set_values:
            resource.set(value, set_values[value])
        store.store(resource.content, token)


@app.route('/api/data/v1/action/deleteOne', methods=['POST'])
def delete_one():
    logger.debug("delete_one", f"Received reqeust. Body: {request.get_json()} headers: {request.headers}")
    if not _authorized(request.headers):
        message = "Not authorized"
        return Response(message, status=401)
    return {}


def _get_authorization_token(headers):
    return headers.get('Authorization').replace("Bearer ", "")


def _authorized(headers):
    header_value = _get_authorization_token(headers)
    store = create_store(Storage.JSON)
    tokens = store.load(lambda: [], "tokens")
    filtered_tokens = list(filter(lambda x: x['access_token'] == header_value, tokens))
    if len(filtered_tokens) == 0:
        logger.info("authorized", f"Token {header_value} not found")
        return False
    if _is_expired(filtered_tokens[0]):
        store.store(list(filter(lambda x: x['access_token'] != header_value, tokens)), "tokens")
        return False
    logger.info("authorized", f"Token {header_value} authorized")
    return True


def _remove_expired_tokens():
    logger.info("remove_expired_tokens", "Clean up")
    store = create_store(Storage.JSON)
    tokens = store.load(lambda: [], "tokens")
    store.store(list(filter(lambda x: not _is_expired(x), tokens)), "tokens")


def _is_expired(token):
    now = time.time_ns()
    token_time = token['time']
    is_token_expired = now - token_time > EXPIRATION
    if is_token_expired:
        logger.info("is_expired", f"Token expired {now} {token_time}")
    return is_token_expired


def _internal_server_error(e):
    logger.error("Error", f"Error: {traceback.format_exc()}")
    return Response({"error": "Internal Server Error", "message": str(e)}, status=500, mimetype='application/json')
