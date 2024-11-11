from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os
import logging


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Connect to MongoDB
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://mongodb:27017/productdb")
client = MongoClient(MONGO_URI)
db = client.productdb
products_collection = db['products']

@app.route('/', methods=['GET'])
def get_products():
    products = list(products_collection.find({}))
    for product in products:
        product['_id'] = str(product['_id'])  # Convert ObjectId to string for JSON
    return jsonify(products), 200

@app.route('/', methods=['POST'])
def create_product():
    product_data = request.json
    result = products_collection.insert_one(product_data)
    product_data['_id'] = str(result.inserted_id)  # Add inserted _id to the response
    return jsonify(product_data), 201

@app.route('/', methods=['DELETE'])
def delete_all_users():
    result = products_collection.delete_many({})
    if result.deleted_count > 0:
        return '', 204  # Successfully deleted all users
    else:
        return jsonify({'error': 'No users to delete'}), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)