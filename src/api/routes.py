"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, redirect, session
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

#//////////////////////////////////// VIDEOOOOOOOOOOOOOOOOOOOO

@api.route('/signup', methods=['POST'])
def signup_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({'error': 'User already exists'}), 400

    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    token = create_access_token(identity=new_user.id)

    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        "token": token
    })


#//////////////////////////////////// VIDEOOOOOOOOOOOOOOOOOOOO

@api.route('/login', methods=['POST'])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({'error': 'Unauthorized'}), 400

    token = create_access_token(identity=user.id)

    return jsonify({"message": "el usuario se ha logeado con éxito",
                    "id": user.id,
                    "email": user.email,
                    "token": token
                    })

#//////////////////////////////////// VIDEOOOOOOOOOOOOOOOOOOOO

@api.route('/private', methods=['GET'])
@jwt_required()
def private_user():
    user_id = get_jwt_identity()

    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 400
    
    # user = User.query.get(user_id)
    user = User.query.filter_by(id=user_id).first()

    return jsonify({"message": "el usuario es correcto",                     
                    "id": user.id,
                    "email": user.email
                    })

if __name__ == '__main__':
    api.run()




# @api.route('/', methods=['POST'])
# def signup_user():
#     data = request.get_json()
#     user = User(email=data['email'], password=data['password'])

#     if not user.email or not user.password:
#         return jsonify({'message': 'Email and password are required'}), 400

#     if user:
#         db.session.add(user)
#         db.session.commit()

#     token = create_access_token(identity=user.id)

#     return jsonify({"user":user.serialize(), "token": token}), 200


# @api.route('/login', methods=['POST'])
# def login_user():
#     data = request.get_json()
#     user = User.query.filter_by(email=data['email'], password=data['password']).first()
#     token = create_access_token(identity=user.id)

#     return jsonify({"message": "el usuario se ha logeado con éxito", "user": user.serialize(), "token": token})


# @api.route('/private', methods=['GET'])
# @jwt_required()
# def private_user():
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)

#     return jsonify({"message": "el usuario es correcto", "user": user.serialize()})