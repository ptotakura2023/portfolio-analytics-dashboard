from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

mongo = PyMongo()

def create_app():
    load_dotenv()
    app = Flask(__name__)
    CORS(app)

    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

    mongo.init_app(app)

    from app.routes.analytics import analytics_bp
    from app.routes.auth import auth_bp

    app.register_blueprint(analytics_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api")

    return app
