import argon2
import jwt
from datetime import datetime, timezone, timedelta
from connexion.exceptions import OAuthProblem
from config import ENV, db, flask_app
from models import Admin

pass_hasher = argon2.PasswordHasher()

def basic_auth(username: str, password: str) -> str:
    admin = None
    with flask_app.app_context():
        admin = db.session.execute(db.select(Admin).where(Admin.username == username)).scalar_one_or_none()

    if admin is None:
        raise OAuthProblem('Invalid credentials')
    
    try:
        pass_hasher.verify(admin.password, password)
    except argon2.exceptions.VerifyMismatchError:
        raise OAuthProblem('Invalid credentials')

    if pass_hasher.check_needs_rehash(admin.password):
        admin.password = pass_hasher.hash(password)
        db.session.commit()

    return {'sub': admin.username}

def generate_jwt(username: str):
    payload = {
        'iss': ENV['JWT_ISSUER'],
        'sub': username,
        'exp': datetime.now(timezone.utc) + timedelta(hours=1),
        'iat': datetime.now(timezone.utc)
    }

    return jwt.encode(payload, ENV['JWT_PRIVATE_KEY'], algorithm='HS256')

def decode_jwt(token: str):
    try:
        return jwt.decode(token, ENV['JWT_PRIVATE_KEY'], algorithms=["HS256"])

    except jwt.ExpiredSignatureError:
        raise OAuthProblem("Token has expired")
    except jwt.InvalidTokenError:
        raise OAuthProblem("Token is invalid")