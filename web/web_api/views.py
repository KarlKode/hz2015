import os
from flask import config, current_app
from flask.ext.restful import Resource, reqparse, abort
import re
from werkzeug.utils import secure_filename

TEST_PHOTO_AVATAR = {
    'id': '9fc04aa4-e53d-4d93-a46c-337d8f4a2fe2',
    'img': {

    },
    'public': False,
    'lng': 47.480788,
    'lat': 8.1330125,
    'user': None,
}

TESTS_USER = {
    'id': '0791234567',
    'img': TEST_PHOTO_AVATAR,
}

TEST_PHOTO = {
    'id': '9750bbbc-680d-4b3b-ae7c-92826333ddb7',
    'img': {

    },
    'public': False,
    'lng': 47.380788,
    'lat': 8.5330125,
    'user': TESTS_USER,
}

TEST_EVENT = {
    id: 'cda7d926-5045-460a-8e3d-420ddd89f2d8',
    'title': "Test Event",
    'img': None,
    'friends': [],
    'attending': False,
}


user_parser = reqparse.RequestParser()
user_parser.add_argument('id', required=True)
user_parser.add_argument('contacts', required=True, type=list)

class Users(Resource):
    def post(self):
        args = user_parser.parse_args()
        user_id = args.get('id')
        if len(user_id) != 10 or user_id.isdigit():
            abort(400, message="Invalid user ID")
        # TODO: Validate user_id (=phone nr)
        return {id: user_id}


event_parser = reqparse.RequestParser()
event_parser.add_argument('lng', required=True, type=float)
event_parser.add_argument('lat', required=True, type=float)


class InvalidEventLocationError(Exception):
    pass


class Events(Resource):
    def get(self):
        args = event_parser.parse_args()
        lat = args.get('lat')
        lng = args.get('lng')
        if abs(lat) > 90 or abs(lng) > 180:
            abort(400, message="Invalid user event coordinates")



class Photos():
    def get(self):
        pass

    def post(self):
        pass

    def put(self):
        pass


class Friends(Resource):
    def get(self):
        pass


IMAGE_FILE_RE = re.compile(r'^([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}_)(big|small|blurred)(\.jpg)$')
IMAGE_VALID_SIZES = ('big', 'small', 'blurred')

class Images(Resource):
    def get(self, image_name):
        match = IMAGE_FILE_RE.match(image_name)
        if not match or match.group(2) not in IMAGE_VALID_SIZES:
            abort(404, message="Invalid image filename")
        path = os.path.join(current_app.config.UPLOAD_FOLDER, 'images', image_name)
        def valid_file(p):
            return os.path.exists(p) or not os.path.isfile(p)
        if not valid_file(path):
            # File might not have been resized/blurred yet
            orig_path = os.path.join(current_app.config.UPLOAD_FOLDER, 'images', '{img_uuid}{img_size}{img_extension}'.format(img_uuid=match.group(1), img_size='orig', img_extension=match.group(3)))
            if not valid_file(orig_path):
                abort(404, message="Image not found")
            # TODO: resize