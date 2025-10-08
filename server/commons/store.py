import json
import os.path
import pickle
from enum import Enum

from commons.logger import get_logger

logger = get_logger("Store")


class Storage(Enum):
    PICKLE = 1
    JSON = 2


def create_store(storage: Storage):
    if storage == Storage.PICKLE:
        return Store(lambda s: _pkl_load(s), lambda obj, s: _pkl_store(obj, s), "pkl")
    if storage == Storage.JSON:
        return Store(lambda s: _json_load(s), lambda obj, s: _json_store(obj, s), "json")


class Store:

    def __init__(self, loader, saver, extension):
        self.loader = loader
        self.saver = saver
        self.extension = extension

    def exist(self, storage: str):
        return os.path.isfile(storage + "." + self.extension)

    def load(self, supplier, storage: str):
        if self.exist(storage):
            obj = self.loader(storage + "." + self.extension)
            logger.info("load", f'Loaded from store {len(obj)} items')
            return obj
        obj = supplier()
        logger.info("load", f'Load from supplier {len(obj)} items')
        self.saver(obj, storage + "." + self.extension)
        return obj

    def store(self, obj, storage: str):
        logger.info("store", f'Store {len(obj)} items')
        self.saver(obj, storage + "." + self.extension)


def _json_store(obj, storage: str):
    with open(storage, 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=4)


def _json_load(storage: str):
    with open(storage, encoding='utf-8') as f:
        return json.load(f)


def _pkl_store(obj, storage: str):
    with open(storage, 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)


def _pkl_load(storage: str):
    with open(storage, 'rb') as f:
        return pickle.load(f)
