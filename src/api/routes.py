"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, redirect, session
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def signup_user():
    data = request.get_json()
    user = User(email=data['email'], password=data['password'])

    if not user.email or not user.password:
        return jsonify({'message': 'Email and password are required'}), 400
    
    if user:
        db.session.add(user)
        db.session.commit()

    token = create_access_token(identity=user.id)

    return jsonify({"user":user.serialize(), "token": token}), 200


@api.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    token = create_access_token(identity=user.id)

    return jsonify({"message": "el usuario se ha logeado con éxito", "user": user.serialize(), "token": token})


@api.route('/private', methods=['GET'])
@jwt_required()
def private_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    return jsonify({"message": "el usuario es correcto", "user": user.serialize()})


if __name__ == '__main__':
    api.run()







