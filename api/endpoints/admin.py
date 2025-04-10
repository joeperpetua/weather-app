from security import generate_jwt

def login(user: str):
    token = generate_jwt(user)

    return {'token': token}, 200