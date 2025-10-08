import json
import os.path
import time
from datetime import datetime
from enum import Enum

import yaml


class Level(Enum):
    ALL = 0
    TRACE = 1
    DEBUG = 2
    INFO = 3
    WARN = 4
    ERROR = 5
    OFF = 6


__root_level: Level = Level.INFO

__level = {}

__log_format = "{time} [{pid}] {level} {name} - {message}"


def set_format(log_format: str):
    global __log_format
    __log_format = log_format


def set_root_level(level: Level):
    global __root_level
    __root_level = level


def set_level(name: str, level: Level):
    global __level
    __level[name] = level


def _load_logback(file_name: str, provider):
    with open(file_name) as file:
        logback = provider(file)
        logging = logback['logging']
        level = logging['level']
        set_format(logging['format'])
        set_root_level(Level[level['root']])
        for key in level:
            if key != 'root':
                set_level(key, Level[level[key]])


if os.path.isfile("logback.json"):
    _load_logback("logback.json", lambda file: json.load(file))

if os.path.isfile("logback.yaml"):
    _load_logback("logback.yaml", lambda file: yaml.safe_load(file))


def get_logger(name: str):
    global __level
    global __root_level
    global __log_format
    return CompositeLogger(name, __log_format, __level[name] if name in __level else __root_level)


class Logger:

    def __init__(self, name: str, log_format: str, level: Level, timestamp_format="%Y-%m-%dT%H:%M:%S.%f"):
        self.name = name
        self.level = level
        self.log_format = log_format
        self.timestamp_format = timestamp_format

    def info(self, method_name: str, message: str, content_provider=lambda x: x):
        self.log(Level.INFO, method_name, message, content_provider)

    def debug(self, method_name: str, message: str, content_provider=lambda x: x):
        self.log(Level.DEBUG, method_name, message, content_provider)

    def trace(self, method_name: str, message: str, content_provider=lambda x: x):
        self.log(Level.TRACE, method_name, message, content_provider)

    def warn(self, method_name: str, message: str, content_provider=lambda x: x):
        self.log(Level.WARN, method_name, message, content_provider)

    def error(self, method_name: str, message: str, content_provider=lambda x: x):
        self.log(Level.ERROR, method_name, message, content_provider)

    def log(self, level: Level, method_name: str, message: str, content_provider=lambda x: x):
        pass

    def format(self, level: Level, method_name: str, message: str, message_provider=lambda x: x):
        return self.log_format.format(pid=os.getpid(), level=level.name, time=self._now(),
                                      name=self._get_name(method_name),
                                      message=message_provider(message))

    def _now(self):
        return datetime.now().strftime(self.timestamp_format)

    def _get_name(self, method_name: str):
        return f'{self.name}:{method_name}' if method_name is not None else self.name


class ConsoleLogger(Logger):

    def __init__(self, name: str, log_format: str, level: Level):
        super().__init__(name, log_format, level)

    def log(self, level: Level, method_name: str, message: str, content_provider=lambda x: x):
        print(self.format(level, method_name, message, content_provider))


class FileLogger(Logger):

    def __init__(self, name: str, log_format: str, level: Level, file_name: str):
        super().__init__(name, log_format, level)
        self.file_name = file_name

    def log(self, level: Level, method_name: str, message: str, content_provider=lambda x: x):
        log_file = open(self.file_name, "a")
        log_file.write(self.format(level, method_name, message, content_provider) + '\n')
        log_file.close()


class CompositeLogger(Logger):

    def __init__(self, name: str, log_format: str, level: Level, file_name="app.log"):
        super().__init__(name, log_format, level)
        self.loggers = [ConsoleLogger(name, log_format, level), FileLogger(name, log_format, level, file_name)]

    def log(self, level: Level, method_name=None, message: str = "", content_provider=lambda x: x):
        if message is None:
            return
        if level.value < self.level.value:
            return
        if level.value in [Level.INFO.value]:
            message = message.replace("{args}", "-").replace("{result}", "-")
        if level != Level.OFF:
            for logger in self.loggers:
                logger.log(level, method_name, message, content_provider)


def log(level=Level.INFO,
        start_message="Execution started args: {args}",
        end_message="Execution completed args: {args} result: {result} in {duration}ms"):
    def log_decorator(func):
        def log_wrapper(*args, **kwargs):
            logger = get_logger("Log")
            logger.log(level, func.__name__, start_message, lambda x: x.format(args=args))

            start = time.time_ns()
            result = func(*args, **kwargs)
            duration = _get_duration(start)

            logger.log(level, func.__name__, end_message,
                       lambda x: x.format(args=args, result=f"{str(result)}", duration=duration))
            return result

        return log_wrapper

    return log_decorator


def _get_duration(start):
    return _convert_to_ms(time.time_ns() - start)


def _convert_to_ms(ns):
    return int(ns / 1000000)
