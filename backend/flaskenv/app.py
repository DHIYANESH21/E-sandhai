from flask import Flask, jsonify
from flask_pymongo import PyMongo
import bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
jwt = JWTManager(app)
CORS(app)

# MongoDB Configuration
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo = PyMongo(app)

# Secret Key Configuration
app.secret_key = 'secret'
app.config['JWT_SECRET_KEY'] = 'secret-key'

# Import routes (without Blueprints)
from routes.auth import register_user
app.route('/register', methods=['POST'])(register_user(mongo))

@app.route('/')
def samplefun():
    return 'Hello world'

if __name__ == '__main__':
    app.run(debug=True)
