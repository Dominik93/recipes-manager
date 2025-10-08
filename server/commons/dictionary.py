from typing import Callable


class Dictionary:

    def __init__(self, content: dict):
        self.content = content

    def exists(self, path: str) -> bool:
        return self._exists(path.split("."))

    def do_with(self, path: str, consumer: Callable):
        if self.exists(path):
            consumer(self.get_value(path))

    def map(self, path: str, consumer: Callable, default: any = ''):
        if self.exists(path):
            return consumer(self.get_value(path))
        return default

    def get(self, path: str, default: any = ''):
        return Dictionary(self._get_or_default(path.split("."), default))

    def get_value(self, path: str, default: any = '') -> dict | list | str | int:
        return self._get_or_default(path.split("."), default)

    def _get_or_default(self, property_names: list, default: any = '') -> dict | list | str | int:
        result = self.content
        for property_name in property_names:
            if result is not None and property_name in result:
                result = result[property_name]
            else:
                return default
        return result

    def set(self, path: str, value: any):
        self._set(path.split("."), value)

    def _set(self, property_names: list, value: any):
        result = self.content
        i = 0
        size = len(property_names)
        for property_name in property_names:
            if result is not None and property_name in result:
                if i == size - 1:
                    result[property_name] = value
                result = result[property_name]
            i += 1

    def delete(self, path):
        self._delete(path.split("."))

    def _delete(self, property_names: list):
        result = self.content
        i = 0
        size = len(property_names)
        for property_name in property_names:
            if result is not None and property_name in result:
                if i == size - 1:
                    del result[property_name]
                else:
                    result = result[property_name]
            i += 1

    def _exists(self, property_names: list) -> bool:
        result = self.content
        for property_name in property_names:
            if result is not None and property_name in result:
                result = result[property_name]
            else:
                return False
        return True
