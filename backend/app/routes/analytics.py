from flask import Blueprint, request, jsonify
from app import mongo
from app.models import serialize_event
from datetime import datetime

analytics_bp = Blueprint("analytics", __name__)

@analytics_bp.route("/log_event", methods=["POST"])
def log_event():
    data = request.json
    data["timestamp"] = datetime.utcnow()
    mongo.db.events.insert_one(data)
    return jsonify({"status": "logged"}), 200

@analytics_bp.route("/events", methods=["GET"])
def get_events():
    events = list(mongo.db.events.find())
    serialized = [serialize_event(e) for e in events]
    return jsonify(serialized), 200 