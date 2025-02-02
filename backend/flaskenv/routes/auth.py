from flask import request, jsonify
import bcrypt
from flask_jwt_extended import create_access_token

def register_user(mongo):
    def register():
        allUsers = mongo.db.users
        email = allUsers.find_one({'email': request.json['email']})

        if email:
            return jsonify(message='Email already exists'), 401

        hashpw = bcrypt.hashpw(
            request.json['pwd'].encode('utf-8'), bcrypt.gensalt()
        )

        access_token = create_access_token(identity=request.json['email'])

        allUsers.insert_one({
            'username': request.json['username'], 
            'email': request.json['email'], 
            'pwd': hashpw, 
            'role': request.json['role'],
            'tokens': {'token': str(access_token)}
        })

        return jsonify(token=str(access_token)), 201
    
    return register  # Return the function to use it in `app.py`
