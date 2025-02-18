from flask import request, jsonify
import bcrypt
from flask_jwt_extended import create_access_token

def register_user(mongo):
    def register():
        try:
            if not request.is_json:
                return jsonify({"message": "Missing JSON in request"}), 400

            required_fields = ['email', 'pwd', 'username', 'role']
            if not all(field in request.json for field in required_fields):
                return jsonify({"message": "Missing required fields"}), 400

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

            return jsonify({
                "message": "User created successfully",
                "token": str(access_token)
            }), 201

        except Exception as e:
            print(f"Registration error: {str(e)}")  # For debugging
            return jsonify({"message": "Internal server error"}), 500
    
    return register


def login_user(mongo):
    def login():
        try:
            if not request.is_json:
                return jsonify({"message": "Missing JSON in request"}), 400
            
            required_fields = ['email', 'pwd']
            if not all(field in request.json for field in required_fields):
                return jsonify({"message": "Missing required fields"}), 400
            
            allusers = mongo.db.users
            user = allusers.find_one({'email': request.json['email']})

            if not user :
                return jsonify({"message":"email not found "}),400
            
            if bcrypt.checkpw(request.json['pwd'].encode('utf-8'),user['pwd']):
                access_token = create_access_token(identity=user['email'])
                allusers.update_one(
                    {'email': user['email']},
                    {'$set': {'tokens.token': str(access_token)}}
                )
                return jsonify({
                    "message": "Login successful",
                    "token": str(access_token)
                }), 200
            else:
                return jsonify({"message":"Invalid password"}),401
        
        except Exception as e:
            print(f"login error: {str(e)}")  # For debugging
            return jsonify({"message": "Internal server error"}), 500
        
    return login
