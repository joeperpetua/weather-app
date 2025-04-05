import os
from dotenv import load_dotenv
from connexion import FlaskApp
from connexion.middleware import MiddlewarePosition
from starlette.middleware.cors import CORSMiddleware
from sqlalchemy.engine import URL
from flask_sqlalchemy import SQLAlchemy

load_dotenv('.env')

app = FlaskApp(__name__)
app.add_api('openapi.yaml', resolver_error=501)
app.add_middleware(
    CORSMiddleware,
    MiddlewarePosition.BEFORE_EXCEPTION,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

ENV = {
    'DB_USER': os.getenv('DB_USER'),
    'DB_PASS': os.getenv('DB_PASS'),
    'DB_HOST': os.getenv('DB_HOST'),
    'DB_PORT': os.getenv('DB_PORT'),
    'DB_NAME': os.getenv('DB_NAME'),
    'AUTO_CREATE_ADMIN': os.getenv('AUTO_CREATE_ADMIN'),
    'ADMIN_NAME': os.getenv('ADMIN_NAME'),
    'ADMIN_PASS': os.getenv('ADMIN_PASS'),
    'JWT_ISSUER': os.getenv('JWT_ISSUER'),
    'JWT_PRIVATE_KEY': os.getenv('JWT_PRIVATE_KEY')
}

DB_URL = URL.create(
    "mssql+pyodbc",
    username=ENV['DB_USER'],
    password=ENV['DB_PASS'],
    host=ENV['DB_HOST'],
    port=int(ENV['DB_PORT']),
    database=ENV['DB_NAME'],
    query={
        'driver': 'ODBC Driver 17 for SQL Server'
    },
)
flask_app = app.app
flask_app.config["SQLALCHEMY_DATABASE_URI"] = DB_URL
db = SQLAlchemy(flask_app)