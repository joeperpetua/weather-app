import os
import argon2
import jwt
from dotenv import load_dotenv
from datetime import datetime, timezone, timedelta
from typing import Optional
from connexion import FlaskApp
from connexion import problem
from connexion.exceptions import OAuthProblem
from connexion.middleware import MiddlewarePosition
from starlette.middleware.cors import CORSMiddleware

pass_hasher = argon2.PasswordHasher()
load_dotenv('.env')

# DB connection setup

app = FlaskApp(__name__)
app.add_middleware(
    CORSMiddleware,
    MiddlewarePosition.BEFORE_EXCEPTION,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def validate_date(from_date: str, to_date: str):
    from_d = datetime.strptime(from_date, '%Y-%m-%d')
    to_d = datetime.strptime(to_date, '%Y-%m-%d')

    if from_d > to_d:
        return {'message': 'From date must be before to date.'}, 400
    
    return

def basic_auth(username: str, password: str) -> str:
    # Mock - Get user from DB
    admin = {"username": username, "password": pass_hasher.hash(password)}

    try:
        pass_hasher.verify(admin['password'], password)
    except argon2.exceptions.VerifyMismatchError:
        raise OAuthProblem('Invalid credentials')

    if pass_hasher.check_needs_rehash(admin['password']):
        admin['password'] = pass_hasher.hash(password)
        # db.session.commit()

    return {'sub': username}

def generate_jwt(username: str):
    payload = {
        'iss': os.getenv('JWT_ISSUER'),
        'sub': username,
        'exp': datetime.now(timezone.utc) + timedelta(hours=1),
        'iat': datetime.now(timezone.utc)
    }

    return jwt.encode(payload, os.getenv('JWT_PRIVATE_KEY'), algorithm='HS256')

def decode_jwt(token: str):
    try:
        return jwt.decode(token, os.getenv("JWT_PRIVATE_KEY"), algorithms=["HS256"])

    except jwt.ExpiredSignatureError:
        raise OAuthProblem("Token has expired")
    except jwt.InvalidTokenError:
        raise OAuthProblem("Token is invalid")

def get_cities(city: Optional[str] = None):
    return {'city': city}, 200

def get_forecast_daily(city_id: int, days: int, units: str):

    return {'city_id': city_id, 'days': days, 'units': units}, 200

def get_forecast_hourly(city_id: int, days: int, units: str):

    return {'city_id': city_id, 'days': days, 'units': units}, 200

def get_historical(city_id: int, from_date: str, to_date: str):
    validate_date(from_date, to_date)
    return {'city_id': city_id, 'from': from_date, 'to': to_date}, 200

def admin_login(user: str):
    token = generate_jwt(user)

    return {'token': token}, 200

def delete_city(city_id: int):
    return {'city_id': city_id}, 200

app.add_api('openapi.yaml', resolver_error=501)

if __name__ == "__main__":
    app.run("app:app", port=8000)