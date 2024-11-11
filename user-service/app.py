from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Connect to MongoDB
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://mongodb:27017/userdb")
client = MongoClient(MONGO_URI)
db = client.userdb
users_collection = db['users']

@app.route('/', methods=['GET'])
def get_users():
    users = list(users_collection.find({}))
    for user in users:
        user['_id'] = str(user['_id'])  # Convert ObjectId to string for JSON
    return jsonify(users), 200

@app.route('/', methods=['POST'])
def create_user():
    user_data = request.json
    result = users_collection.insert_one(user_data)
    user_data['_id'] = str(result.inserted_id)  # Add inserted _id to the response
    return jsonify(user_data), 201


@app.route('/', methods=['DELETE'])
def delete_all_users():
    result = users_collection.delete_many({})
    if result.deleted_count > 0:
        return '', 204  # Successfully deleted all users
    else:
        return jsonify({'error': 'No users to delete'}), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)