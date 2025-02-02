from flask import Flask, jsonify, request, session
from flask_pymongo import PyMongo
import bcrypt
import jwt
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS, cross_origin

app=Flask(__name__)
jwt=JWTManager(app)
CORS(app)

app.config['MONGO_URI'] = 'mongodb+srv://kailash:2006@dhiyanesh.2u0vq.mongodb.net/E-sandhai?retryWrites=true&w=majority&appName=DHIYANESH'

mongo=PyMongo(app)

app.secret_key='secret'
app.config['JWT-SECRET-KEY']='secret-key'


@app.route('/')
def samplefun():
    return 'Hello world'

@app.route('/register', methods=['POST'])
def registerUser():
    allUsers=mongo.db.users
    email=mongo.db.users.find_one({'email':request.json['email']})
    pwd=mongo.db.users.find_one({'pwd':request.json['pwd']})

    if email:
        return jsonify(message='Email already exists'), 401
    
    hashpw=bcrypt.hashpw(
        request.json['pwd'].encode('utf-8'),bcrypt.gensalt()
    )

    access_token=create_access_token(identity=request.json['email'])

    allUsers.insert_one({'username':request.json['username'], 'email':request.json['email'], 'pwd':hashpw, 'role':request.json['role'],'tokens':{'token':str(access_token)}})

    return jsonify(token=str(access_token)), 201



if __name__=='__main__':
    app.run(debug=True)
