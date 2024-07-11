import os
import json
from flask_pymongo import MongoClient
from dotenv import load_dotenv


load_dotenv()


def load_json_data_to_db(json_data):
    with open(json_data, encoding="utf-8") as f:
        data = json.load(f)

    mongo = MongoClient(os.getenv("MONGO_URI"))
    db = mongo["visualization_dashboard_db"]
    collection = db["visualization_dashboard_collection"]

    collection.insert_many(data)
    print("JSON Data loaded succesfully!")


if __name__ == "__main__":
    load_json_data_to_db("cleaned_json_data.json")
