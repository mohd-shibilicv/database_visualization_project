import logging
from flask import current_app
from flask_pymongo import PyMongo


def get_all_data(filters=None) -> list:
    try:
        mongo = PyMongo(current_app)

        if mongo.db is None:
            logging.error("MongoDB connection failed: db is None")
            return []

        query = filters if filters else {}
        data = list(mongo.db.visualization_dashboard_collection.find(query, {"_id": 0}))
        return data
    except Exception as e:
        logging.error(f"Error in getting all data: {str(e)}")
        return []
