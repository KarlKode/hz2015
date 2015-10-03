import os
from flask import Flask
from flask.ext.restful import Api
from web_api.config import CONFIGS

from web_api.db import db


def create_app():
    app = Flask(__name__, instance_path=os.path.realpath(os.path.join(os.path.dirname(__file__), '..', 'instance')), instance_relative_config=True)
    config_name = os.getenv('HZ_ENV', 'dev')
    app.config.from_object(CONFIGS.get(config_name))
    app.config.from_pyfile('config.py')
    app.config['ENV'] = config_name.upper()

app = Flask(__name__)
api = Api(app)

db.init_app(app)