from flask import Flask,request,session
from flask_pymongo import pymongo
import 

app=Flask(__name__)

@app.route('/')
def samplefun():
    return 'Hello world'

if __name__=='__main__':
    app.run(debug=True)
