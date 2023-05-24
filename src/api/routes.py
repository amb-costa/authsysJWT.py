"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def signup():
    username = request.get_json("username")
    email = request.json.get("email")
    password = request.json.get("password")  
    new_user = User(username = username, email = email, password = password)
    db.session.add(new_user)
    db.session.commit()    
    return jsonify(new_user.serialize()), 200

@api.route('/login', methods=['POST', 'GET'])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
            return jsonify({"msg": "Incorrect Email or Password"}), 401
    time_token = timedelta(minutes = 5) #5 min as a case
    access_token = create_access_token(identity=email, expires_delta=time_token)
    return jsonify({"access_token" : access_token}),200


#private route
@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404
    return jsonify(user=user.serialize()), 200