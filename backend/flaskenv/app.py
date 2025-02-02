from flask import Flask, jsonify, request, session
from flask_pymongo import PyMongo
import bcrypt
import jwt




app=Flask(__name__)

@app.route('/')
def samplefun():
    return 'Hello world'

if __name__=='__main__':
    app.run(debug=True)
