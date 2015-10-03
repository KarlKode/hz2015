from web_api.db import SurrogatePK, Model, Column, relationship, db, ReferenceCol
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table
from sqlalchemy.dialects.postgres import *

Base = declarative_base()

class Test(SurrogatePK, Model):
    pass

contacts = Table('contacts', Base.metadata,
    Column('owner_id', UUID,  db.ForeignKey('User.id')),
    Column('contact_id', UUID, db.ForeignKey('User.id'))
)

class User(SurrogatePK, Model):
    phone = Column(db.String)
    event_id = ReferenceCol("Event")
    event = db.relationship("Event", uselist=False)
    contacts = db.relationship("User", secondary=contacts)

    # event_id = db.Column(db.ForeignKey('event.id'))
    #
    #

    def __init__(self, id, phone):
        self.id = id
        self.phone = phone





#
#
# class Event(db.Model):
#     id = db.Column(UUID, primary_key=True)
#     location = db.Column(Geometry())
#     title = db.Column(db.String(200))
#     image_path = db.Column(db.String(200)) #http://...image.jpg
#
#
# # class EventCheckins(db.Model):
# #     id = db.Column(db.Integer, primary_key=True)
# #     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
# #     event_id = db.Column(db.Integer, db.ForeignKey('event.id'))
#
#
# class Photo(db.Model):
#     id = db.Column(UUID, primary_key=True)
#     user_id = db.Column(db.ForeignKey('user.id'))
#     event_id = db.Column(db.ForeignKey('event.id'))
#     location = db.Column(Geometry())
#     image_path = db.Column(db.String(200))
#     public = db.Column(db.Boolean)
#     likes = db.Column(db.Integer)
#
#
# photo_share = Table('photo_shares', Base.metadata,
#     Column('photo_id', UUID, ForeignKey('photo.id')),
#     Column('user_id', UUID, ForeignKey('user.id'))
# )
#
#
#
# class PhotoAccess(db.Model):
#     id = db.Column(UUID, primary_key=True)
#     photo_id = db.Column(db.Integer, db.ForeignKey('photo.id'))
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))



