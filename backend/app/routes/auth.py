from flask import Blueprint, request, jsonify
import jwt
import datetime
import os

auth_bp = Blueprint("auth", __name__)
JWT_SECRET = os.getenv("JWT_SECRET_KEY")

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if username == "admin" and password == "password":
        token = jwt.encode({
            "user": username,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, JWT_SECRET, algorithm="HS256")

        return jsonify({"token": token}), 200

    return jsonify({"error": "Invalid credentials"}), 401 