from flask import Blueprint, jsonify, request, current_app
from flask_pymongo import PyMongo
from .services import get_all_data
from .utils.paginate import paginate


main = Blueprint("main", __name__)


# Errro Handling
@main.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not Found"}), 404


@main.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal Server Error"}), 500


# Endpoints
@main.route("/api/data", methods=["GET"])
def get_data():
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 1000))
    filters = {}

    for key in ["end_year", "topic", "sector", "region", "pestle", "source", "country", "swot"]:
        if request.args.get(key):
            filters[key] = request.args.get(key)
    
    if request.args.get("end_year"):
        filters["end_year"] = int(request.args.get("end_year"))

    data = get_all_data(filters)
    total = len(data)
    paginated_data = paginate(data, page, per_page)

    return jsonify(
        {
            "data": paginated_data,
            "total": total,
            "page": page,
            "per_page": per_page,
            "total_pages": (total + per_page - 1) // per_page,
        }
    )


@main.route("/api/filters", methods=["GET"])
def get_filters():
    mongo = PyMongo(current_app)
    db = mongo.db.visualization_dashboard_collection

    return jsonify(
        {
            "end_years": db.distinct("end_year"),
            "topics": db.distinct("topic"),
            "sectors": db.distinct("sector"),
            "regions": db.distinct("region"),
            "pest": db.distinct("pestle"),
            "sources": db.distinct("source"),
            "swot": db.distinct("swot"),
            "countries": db.distinct("country"),
            "cities": db.distinct("city"),
        }
    )


@main.route("/api/intensity", methods=["GET"])
def get_intensity():
    mongo = PyMongo(current_app)
    db = mongo.db.visualization_dashboard_collection
    pipeline = [
        {"$group": {"_id": "$intensity", "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}},
    ]
    result = list(db.aggregate(pipeline))
    return jsonify(result)


@main.route("/api/likelihood", methods=["GET"])
def get_likelihood():
    mongo = PyMongo(current_app)
    db = mongo.db.visualization_dashboard_collection
    pipeline = [
        {"$group": {"_id": "$likelihood", "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}},
    ]
    result = list(db.aggregate(pipeline))
    return jsonify(result)


@main.route("/api/relevance", methods=["GET"])
def get_relevance():
    mongo = PyMongo(current_app)
    db = mongo.db.visualization_dashboard_collection
    pipeline = [
        {"$group": {"_id": "$relevance", "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}},
    ]
    result = list(db.aggregate(pipeline))
    return jsonify(result)


@main.route("/api/year", methods=["GET"])
def get_year():
    mongo = PyMongo(current_app)
    db = mongo.db.visualization_dashboard_collection
    pipeline = [
        {"$group": {"_id": "$start_year", "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}},
    ]
    result = list(db.aggregate(pipeline))
    return jsonify(result)


@main.route("/api/country", methods=["GET"])
def get_country():
    mongo = PyMongo(current_app)
    db = mongo.db.visualization_dashboard_collection
    pipeline = [
        {"$group": {"_id": "$country", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
    ]
    result = list(db.aggregate(pipeline))
    return jsonify(result)


@main.route("/api/topics", methods=["GET"])
def get_topics():
    mongo = PyMongo(current_app)
    db = mongo.db.visualization_dashboard_collection
    pipeline = [
        {"$group": {"_id": "$topic", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
    ]
    result = list(db.aggregate(pipeline))
    return jsonify(result)


@main.route("/api/region", methods=["GET"])
def get_region():
    mongo = PyMongo(current_app)
    db = mongo.db.visualization_dashboard_collection
    pipeline = [
        {"$group": {"_id": "$region", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
    ]
    result = list(db.aggregate(pipeline))
    return jsonify(result)


@main.route("/api/city", methods=["GET"])
def get_city():
    mongo = PyMongo(current_app)
    db = mongo.db.visualization_dashboard_collection
    pipeline = [
        {"$group": {"_id": "$city", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
    ]
    result = list(db.aggregate(pipeline))
    return jsonify(result)


@main.route('/api/swot', methods=['GET'])
def get_swot():
    mongo = PyMongo(current_app)
    db = mongo.db.visualization_dashboard_collection
    pipeline = [
        {"$group": {"_id": "$swot", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    result = list(db.aggregate(pipeline))
    return jsonify(result)
