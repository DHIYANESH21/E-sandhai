from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
import os
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS
CORS(app, resources={
    r"/*": {
        "origins": "*",  # In development only. Configure properly in production
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# MongoDB Configuration
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo = PyMongo(app)
print(os.getenv('MONGO_URI'))


# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-secret-key')
jwt = JWTManager(app)

# Import routes
from routes.auth import register_user
from routes.auth import login_user

# Add logging middleware
@app.before_request
def log_request_info():
    logger.debug('Headers: %s', request.headers)
    logger.debug('Body: %s', request.get_data())

@app.after_request
def after_request(response):
    logger.debug('Response: %s', response.get_data())
    return response

# Register routes
app.route('/api/register', methods=['POST'])(register_user(mongo))

app.route('/api/signin',methods=['POST'])(login_user(mongo))

@app.route('/')
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, port=port)