import openmeteo_requests
import requests_cache
from retry_requests import retry
import pandas as pd
from connexion.problem import problem
from config import db, ENV
from datetime import datetime
from models import City
from openmeteo_sdk import VariableWithValues

cache_session = requests_cache.CachedSession(".cache", expire_after=3600)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
openmeteo = openmeteo_requests.Client(session=retry_session)


def __validate_date(from_date: str, to_date: str):
    from_d = datetime.strptime(from_date, "%Y-%m-%d")
    to_d = datetime.strptime(to_date, "%Y-%m-%d")

    if from_d > to_d:
        return problem(400, "Bad Request", "From date must be before to date")

    return

def __extract_values(variable: VariableWithValues, to_int: bool = True):
    return [
        int(variable.Values(i)) if to_int else variable.Values(i) for i in range(variable.ValuesLength())
    ]

def __build_params(
        days: int,
        interval: str, 
        units: str, 
        aqi: bool, 
        coordinates: list[float], 
    ):
    params = {
        "latitude": coordinates[0],
        "longitude": coordinates[1],	
        "timezone": "auto",
        "forecast_days": days,
    }

    if interval == "daily":
        params['daily'] = [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "uv_index_max",
            "precipitation_probability_max",
            "wind_speed_10m_max",
            "wind_direction_10m_dominant",
            "relative_humidity_2m_max",
        ]
    
    if interval == "hourly":
        params['hourly'] = [
            "temperature_2m", 
            "relative_humidity_2m", 
            "apparent_temperature", 
            "precipitation_probability", 
            "precipitation", 
            "weather_code", 
            "wind_speed_10m", 
            "wind_direction_10m", 
            "wind_gusts_10m", 
            "uv_index"
        ]

    if aqi:
        params["hourly"] = ["us_aqi"] if units == "imperial" else ["european_aqi"]
    elif units == "imperial":
        params["temperature_unit"] = "fahrenheit"
        params["windspeed_unit"] = "mph"
        params["precipitation_unit"] = "inch"

    return params


def get_forecast_daily(cityId: int, days: int, units: str):
    city = db.session.execute(
        db.select(City).where(City.id == cityId)
    ).scalar_one_or_none()

    if city is None:
        return problem(404, "Not Found", "City not found")

    params = __build_params(
        days=days, 
        interval="daily", 
        units=units, 
        aqi=False, 
        coordinates=[city.lat, city.lon]
    )

    responses = openmeteo.weather_api(f"{ENV['OPEN_METEO_API_BASE']}/forecast", params=params)
    response = responses[0]

    data = response.Daily()
    if data is None:
        return problem(500, "Internal Server Error", "Daily forecast information could not be retrieved from OpenMeteo")

    forecast = {
        "date": list(pd.date_range(
                    start=pd.to_datetime(data.Time() + response.UtcOffsetSeconds(), unit="s", utc=True),
                    end=pd.to_datetime(data.TimeEnd() + response.UtcOffsetSeconds(), unit="s", utc=True),
                    freq=pd.Timedelta(seconds=data.Interval()),
                    inclusive="left"
                ).strftime("%Y-%m-%d")),
        "weatherCode": __extract_values(data.Variables(0)),
        "temperatureMax": __extract_values(data.Variables(1)),
        "temperatureMin": __extract_values(data.Variables(2)),
        "uvIndex": __extract_values(data.Variables(3)),
        "precipitationProbability": __extract_values(data.Variables(4)),
        "windSpeed": __extract_values(data.Variables(5)),
        "windDirection": __extract_values(data.Variables(6)),
        "relativeHumidity": __extract_values(data.Variables(7)),
        "units": units
    }

    return forecast, 200


def get_forecast_hourly(cityId: int, days: int, units: str):
    city = db.session.execute(
        db.select(City).where(City.id == cityId)
    ).scalar_one_or_none()

    if city is None:
        return problem(404, "Not Found", "City not found")

    params = __build_params(
        days=days, 
        interval="hourly", 
        units=units, 
        aqi=False, 
        coordinates=[city.lat, city.lon]
    )

    params_aqi = __build_params(
        days=days, 
        interval="hourly", 
        units=units, 
        aqi=True, 
        coordinates=[city.lat, city.lon]
    )

    responses = openmeteo.weather_api(f"{ENV['OPEN_METEO_API_BASE']}/forecast", params=params)
    response = responses[0]

    responses_aqi = openmeteo.weather_api(f"{ENV['OPEN_METEO_API_AQI']}/air-quality", params=params_aqi)
    response_aqi = responses_aqi[0]

    data = response.Hourly()
    data_aqi = response_aqi.Hourly()
    if data is None or data_aqi is None:
        return problem(500, "Internal Server Error", "Hourly forecast information could not be retrieved from OpenMeteo")

    forecast = {
        "date": list(pd.date_range(
                    start=pd.to_datetime(data.Time() + response.UtcOffsetSeconds(), unit="s", utc=True),
                    end=pd.to_datetime(data.TimeEnd() + response.UtcOffsetSeconds(), unit="s", utc=True),
                    freq=pd.Timedelta(seconds=data.Interval()),
                    inclusive="left"
                ).strftime("%Y-%m-%dT%H:%M")),
        "temperature": __extract_values(data.Variables(0)),
        "relativeHumidity": __extract_values(data.Variables(1)),
        "apparentTemperature": __extract_values(data.Variables(2)),
        "precipitationProbability": __extract_values(data.Variables(3)),
        "precipitation": __extract_values(data.Variables(4)),
        "weatherCode": __extract_values(data.Variables(5)),
        "windSpeed": __extract_values(data.Variables(6)),
        "windDirection": __extract_values(data.Variables(7)),
        "windGust": __extract_values(data.Variables(8)),
        "uvIndex": __extract_values(data.Variables(9)),
        "aqi": __extract_values(data_aqi.Variables(0)),
        "units": units
    }

    return forecast, 200


def get_historical(cityId: int, from_date: str, to_date: str):
    __validate_date(from_date, to_date)
    return {"cityId": cityId, "from": from_date, "to": to_date}, 200
