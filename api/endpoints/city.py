from typing import Optional
from datetime import datetime
from connexion.problem import problem
from config import db
from models import Admin, City


def get_cities(city: Optional[str] = None):
    response = []

    if city is None:
        city = db.session.execute(db.select(City)).scalars().all()
        response = [city.to_dict() for city in city]
    else:
        city = db.session.execute(
            db.select(City).where(City.name == city)
        ).scalar_one_or_none()

        if city:
            response = [city.to_dict()]

    return response, 200


def post_city_add(body: dict):
    city_exists = db.session.execute(
        db.select(City).where(
            City.name == body["cityName"],
            City.country_code == body["countryCode"],
            City.admin_zone_1 == body["adminZone1"],
            City.admin_zone_2 == body["adminZone2"],
        )
    ).scalar_one_or_none()

    if city_exists is not None:
        return problem(400, "Bad Request", "City already exists")

    city = City(
        name=body["cityName"],
        country=body["country"],
        country_code=body["countryCode"],
        lat=body["coordinates"]["lat"],
        lon=body["coordinates"]["lon"],
        timezone=body["timezone"],
        admin_zone_1=body["adminZone1"],
        admin_zone_2=body["adminZone2"],
    )

    db.session.add(city)
    db.session.commit()

    return city.to_dict(), 200


def put_city_edit(cityId: int, body: dict):
    city = db.session.execute(
        db.select(City).where(City.id == cityId)
    ).scalar_one_or_none()

    if city is None:
        return problem(404, "Not Found", "City not found")

    city.name = body["cityName"]
    city.country = body["country"]
    city.country_code = body["countryCode"]
    city.lat = body["coordinates"]["lat"]
    city.lon = body["coordinates"]["lon"]
    city.timezone = body["timezone"]
    city.admin_zone_1 = body["adminZone1"]
    city.admin_zone_2 = body["adminZone2"]

    db.session.commit()

    return city.to_dict(), 200


def delete_city(cityId: int):
    city = db.session.execute(
        db.select(City).where(City.id == cityId)
    ).scalar_one_or_none()

    if city is None:
        return problem(404, "Not Found", "City not found")

    db.session.delete(city)
    db.session.commit()

    return {"message": "City deleted successfully."}, 200
