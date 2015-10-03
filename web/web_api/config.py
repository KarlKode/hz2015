import os


class BaseConfig(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.environ.get('HZ_SECRET_KEY', 'meow')
    #ASSETS_DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'sqlite://'
    MAX_CONTENT_LENGTH = 100 * 1024 * 1024
    UPLOAD_FOLDER = '/tmp'


class ProductionConfig(BaseConfig):
    pass


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    #ASSETS_DEBUG = True
    DEBUG_TB_PROFILER_ENABLED = True


class TestingConfig(BaseConfig):
    TESTING = True


CONFIGS = {
    'dev': DevelopmentConfig,
    'prod': ProductionConfig,
    'test': TestingConfig,
}
