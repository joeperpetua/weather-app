from typing import Optional
from datetime import datetime
from connexion.problem import problem
from config import db
from models import Admin, City
from security import generate_jwt

def __validate_date(from_date: str, to_date: str):
    from_d = datetime.strptime(from_date, '%Y-%m-%d')
    to_d = datetime.strptime(to_date, '%Y-%m-%d')

    if from_d > to_d:
        return {'message': 'From date must be before to date.'}, 400
    
    return

def get_cities(city: Optional[str] = None):
    response = []

    if city is None:
        city = db.session.execute(db.select(City)).scalars().all()
        response = [city.to_dict() for city in city]
    else:
        city = db.session.execute(db.select(City).where(City.name == city)).scalar_one_or_none()
        
        if city:
            response = [city.to_dict()]

    return response, 200

def get_forecast_daily(cityId: int, days: int, units: str):

    return {'cityId': cityId, 'days': days, 'units': units}, 200

def get_forecast_hourly(cityId: int, days: int, units: str):

    return {'cityId': cityId, 'days': days, 'units': units}, 200

def get_historical(cityId: int, from_date: str, to_date: str):
    __validate_date(from_date, to_date)
    return {'cityId': cityId, 'from': from_date, 'to': to_date}, 200

def admin_login(user: str):
    token = generate_jwt(user)

    return {'token': token}, 200

def post_city_add(body: dict):
    city = City(
        name=body['city_name'], 
        country=body['country'], 
        country_code=body['country_code'], 
        lat=body['coordinates']['lat'], 
        lon=body['coordinates']['lon']
    )

    db.session.add(city)
    db.session.commit()
    
    return city.to_dict(), 200

def put_city_edit(cityId: int, body: dict):
    city = db.session.execute(db.select(City).where(City.id == cityId)).scalar_one_or_none()

    if city is None:
        return problem(404, 'Not Found', 'City not found')
    
    city.name = body['city_name']
    city.country = body['country']
    city.country_code = body['country_code']
    city.lat = body['coordinates']['lat']
    city.lon = body['coordinates']['lon']

    db.session.commit()

    return city.to_dict(), 200

def delete_city(cityId: int):
    city = db.session.execute(db.select(City).where(City.id == cityId)).scalar_one_or_none()

    if city is None:
        return problem(404, 'Not Found', 'City not found')
    
    db.session.delete(city)
    db.session.commit()

    return {'message': 'City deleted successfully.'}, 200