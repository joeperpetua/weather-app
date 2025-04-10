import { Block } from "baseui/block";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchCities, selectCityById } from "../features/citiesSlice";
import ErrorSnackbar from "../ui/Snackbar/Error";
import { useSnackbar } from "baseui/snackbar";
import { useLocation, useNavigate, useParams } from "react-router";
import PageSpinner from "../ui/PageSpinner";
import NotFound from "./NotFound";
import { HeadingLevel } from "baseui/heading";
import CityHeader from "../ui/CityRoute/CityHeader";
import CurrentWeatherCard from "../ui/CityRoute/CurrentWeatherCard";
import DailyForecastItem from "../ui/CityRoute/DailyForecastItem";
import DayInformation from "../ui/CityRoute/DayInformation";
import ForecastCard from "../ui/CityRoute/ForecastCard";
import HourlyForecastItem from "../ui/CityRoute/HourlyForecastItem";
import { getLocalTimeTimezone, timezoneToGMT } from "../services/time";
import { cityURL } from "../services/url";

// 2 day mock hourly
export const weatherDataHourly = {
  "time": [
    "2025-04-09T00:00",
    "2025-04-09T01:00",
    "2025-04-09T02:00",
    "2025-04-09T03:00",
    "2025-04-09T04:00",
    "2025-04-09T05:00",
    "2025-04-09T06:00",
    "2025-04-09T07:00",
    "2025-04-09T08:00",
    "2025-04-09T09:00",
    "2025-04-09T10:00",
    "2025-04-09T11:00",
    "2025-04-09T12:00",
    "2025-04-09T13:00",
    "2025-04-09T14:00",
    "2025-04-09T15:00",
    "2025-04-09T16:00",
    "2025-04-09T17:00",
    "2025-04-09T18:00",
    "2025-04-09T19:00",
    "2025-04-09T20:00",
    "2025-04-09T21:00",
    "2025-04-09T22:00",
    "2025-04-09T23:00",
    "2025-04-10T00:00",
    "2025-04-10T01:00",
    "2025-04-10T02:00",
    "2025-04-10T03:00",
    "2025-04-10T04:00",
    "2025-04-10T05:00",
    "2025-04-10T06:00",
    "2025-04-10T07:00",
    "2025-04-10T08:00",
    "2025-04-10T09:00",
    "2025-04-10T10:00",
    "2025-04-10T11:00",
    "2025-04-10T12:00",
    "2025-04-10T13:00",
    "2025-04-10T14:00",
    "2025-04-10T15:00",
    "2025-04-10T16:00",
    "2025-04-10T17:00",
    "2025-04-10T18:00",
    "2025-04-10T19:00",
    "2025-04-10T20:00",
    "2025-04-10T21:00",
    "2025-04-10T22:00",
    "2025-04-10T23:00"
  ],
  "temperature_2m": [
    8.3,
    7.7,
    7.2,
    7.0,
    7.1,
    6.8,
    6.5,
    6.3,
    6.8,
    7.9,
    9.6,
    10.7,
    12.6,
    13.9,
    14.5,
    14.9,
    14.6,
    14.0,
    13.7,
    13.1,
    11.7,
    10.3,
    8.9,
    8.1,
    7.4,
    7.0,
    6.5,
    5.9,
    5.3,
    5.0,
    4.8,
    4.7,
    4.9,
    5.4,
    6.2,
    7.5,
    9.5,
    11.6,
    12.9,
    14.5,
    15.0,
    15.0,
    14.8,
    14.6,
    13.9,
    12.5,
    11.2,
    10.1
  ],
  "relative_humidity_2m": [
    49,
    52,
    56,
    56,
    55,
    55,
    57,
    59,
    58,
    53,
    50,
    48,
    46,
    39,
    37,
    35,
    37,
    41,
    42,
    43,
    51,
    59,
    70,
    73,
    75,
    79,
    82,
    85,
    88,
    91,
    92,
    93,
    91,
    87,
    79,
    70,
    60,
    44,
    43,
    31,
    32,
    35,
    35,
    38,
    45,
    55,
    63,
    68
  ],
  "apparent_temperature": [
    5.2,
    4.6,
    4.4,
    4.0,
    4.0,
    4.2,
    3.7,
    3.5,
    3.7,
    4.9,
    6.5,
    7.7,
    10.0,
    10.2,
    10.3,
    11.0,
    10.1,
    10.2,
    9.6,
    9.0,
    7.9,
    6.4,
    5.4,
    4.6,
    3.9,
    3.7,
    3.2,
    2.6,
    2.3,
    2.1,
    2.0,
    1.9,
    2.3,
    2.6,
    3.4,
    4.5,
    6.4,
    8.1,
    9.4,
    10.4,
    10.6,
    10.8,
    10.6,
    10.8,
    10.3,
    9.2,
    7.8,
    6.4
  ],
  "precipitation_probability": [
    0,
    0,
    0,
    0,
    0,
    5,
    13,
    8,
    13,
    10,
    3,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "precipitation": [
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00
  ],
  "weather_code": [
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    2,
    2,
    0,
    1,
    1,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    2,
    3,
    3,
    3,
    1,
    2,
    2,
    1,
    2,
    2,
    0,
    0,
    0
  ],
  "wind_speed_10m": [
    4.8,
    4.8,
    4.2,
    4.8,
    5.4,
    1.9,
    3.6,
    4.1,
    6.1,
    4.6,
    6.5,
    6.2,
    8.1,
    11.9,
    14.6,
    12.0,
    16.8,
    12.5,
    14.8,
    14.4,
    13.7,
    15.5,
    14.0,
    13.5,
    13.5,
    12.5,
    12.4,
    12.0,
    10.3,
    9.7,
    9.2,
    9.0,
    8.2,
    8.4,
    8.3,
    9.1,
    10.2,
    12.3,
    13.3,
    14.0,
    14.6,
    14.0,
    14.0,
    12.6,
    12.3,
    13.0,
    14.5,
    16.6
  ],
  "wind_gusts_10m": [
    13.3,
    10.8,
    10.8,
    11.2,
    11.9,
    14.8,
    8.3,
    9.0,
    12.6,
    13.0,
    15.5,
    18.4,
    19.8,
    28.8,
    32.0,
    30.6,
    37.8,
    38.5,
    36.4,
    33.1,
    33.5,
    33.5,
    33.8,
    31.3,
    30.6,
    29.2,
    27.7,
    27.0,
    25.6,
    22.3,
    21.2,
    20.9,
    19.8,
    19.4,
    19.8,
    22.0,
    24.5,
    28.8,
    31.7,
    32.8,
    33.1,
    34.2,
    32.4,
    30.6,
    27.4,
    29.2,
    31.3,
    37.1
  ],
  "wind_direction_10m": [
    103,
    117,
    110,
    138,
    160,
    158,
    174,
    142,
    183,
    231,
    276,
    260,
    291,
    305,
    320,
    316,
    313,
    311,
    313,
    323,
    342,
    335,
    334,
    326,
    103,
    117,
    110,
    138,
    160,
    158,
    174,
    142,
    183,
    231,
    276,
    260,
    291,
    305,
    320,
    316,
    313,
    311,
    313,
    323,
    342,
    335,
    334,
    326
  ],
  "uv_index": [
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.05,
    0.40,
    1.10,
    1.00,
    2.10,
    3.05,
    4.45,
    1.90,
    1.55,
    1.50,
    0.70,
    0.60,
    0.60,
    0.10,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.05,
    0.50,
    1.30,
    2.15,
    3.00,
    3.85,
    4.45,
    4.90,
    4.60,
    3.75,
    2.75,
    1.65,
    0.75,
    0.15,
    0.00,
    0.00,
    0.00
  ],
  "aqi": [
    18,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    20,
    19,
    18,
    18,
    18,
    19,
    21,
    23,
    24,
    26,
    26,
    24,
    23,
    21,
    20,
    19,
    18,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    20,
    19,
    18,
    18,
    18,
    19,
    21,
    23,
    24,
    26,
    26,
    24,
    23,
    21,
    20,
    19
  ]
}

// 7 day mock daily
export const weatherDataDaily = {
  "time": [
    "2025-04-09",
    "2025-04-10",
    "2025-04-11",
    "2025-04-12",
    "2025-04-13",
    "2025-04-14",
    "2025-04-15"
  ],
  "weather_code": [
    3,
    3,
    3,
    3,
    3,
    3,
    3
  ],
  "temperature_2m_max": [
    14.9,
    15.3,
    14.8,
    16.2,
    21.5,
    20.1,
    22.9
  ],
  "temperature_2m_min": [
    6.3,
    4.5,
    6.5,
    8.1,
    8.3,
    12.4,
    11.1
  ],
  "uv_index_max": [
    4.45,
    4.90,
    4.20,
    5.10,
    5.15,
    3.25,
    4.45
  ],
  "precipitation_probability_max": [
    13,
    0,
    8,
    0,
    10,
    13,
    25
  ],
  "wind_speed_10m_max": [
    16.8,
    16.9,
    21.0,
    7.2,
    11.1,
    10.0,
    16.5
  ],
  "wind_direction_10m_dominant": [
    313,
    295,
    293,
    237,
    165,
    241,
    142
  ],
  "relative_humidity_2m_max": [
    88,
    83,
    86,
    79,
    96,
    97,
    100
  ]
}

const CityRoute = () => {
  // Mock
  const city = {
    "cityName": "St. Polten",
    "coordinates": {
      "lat": 48.2,
      "lon": 15.63333
    },
    "country": "Austria",
    "countryCode": "AT",
    "id": 15,
    "admin1": "Lower Austria",
    "admin2": "",
    "timezone": "Asia/Kathmandu"
  }

  const { enqueue, dequeue } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();
  //const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.cities);
  const currentHour = getLocalTimeTimezone(city.timezone).hour;

  // const city = useSelector((state: RootState) => selectCityById(state.cities, Number(params.id) || -1));

  useEffect(() => {
    dispatch(fetchCities()).unwrap().catch(error => ErrorSnackbar('Failed to fetch cities.', error, enqueue, dequeue));
  }, []);

  // Redirect in case the URL is malformed, but the id points to am existing city
  useEffect(() => {
    if (!city) return;
    if (cityURL(city) !== location.pathname) {
      navigate(cityURL(city));
    }
  }, [city]);

  if (loading) return <PageSpinner />

  if (!city) return (
    <NotFound
      message="Specified city does not exist."
      backText="Back to homepage" backPath="/"
    />
  )

  return (
    <Block
      display="flex"
      flexDirection={"column"}
      height={"100%"}
      paddingTop={["1rem", "1rem", "2rem", "2rem"]}
      paddingLeft={["5vw", "5vw", "5vw", "5vw"]}
      paddingRight={["5vw", "5vw", "5vw", "5vw"]}
    >
      <HeadingLevel>
        <CityHeader city={city} />
        <CurrentWeatherCard
          temperature={weatherDataHourly.temperature_2m[currentHour]}
          weatherCode={weatherDataHourly.weather_code[currentHour]}
          apparentTemperature={weatherDataHourly.apparent_temperature[currentHour]}
          temperatureMin={weatherDataDaily.temperature_2m_min[0]}
          temperatureMax={weatherDataDaily.temperature_2m_max[0]}
          timezone={city.timezone}
          precipitation={weatherDataHourly.precipitation[currentHour]}
          humidity={weatherDataHourly.relative_humidity_2m[currentHour]}
          windSpeed={weatherDataHourly.wind_speed_10m[currentHour]}
          windDirection={weatherDataHourly.wind_direction_10m[currentHour]}
          windGust={weatherDataHourly.wind_gusts_10m[currentHour]}
          uvIndex={weatherDataHourly.uv_index[currentHour]}
          aqi={weatherDataHourly.aqi[currentHour]}
        />

        <ForecastCard
          title="Weather today"
          time={`GMT${timezoneToGMT(city.timezone)}`}
        >
          <Block display={"flex"} gridGap={"1vw"} overflow={"auto"}>
            {weatherDataHourly.time.slice(currentHour, currentHour + 24).map((hour, index) => (
              <HourlyForecastItem
                key={index}
                hour={hour.split('T')[1]}
                temperature={weatherDataHourly.temperature_2m[currentHour + index]}
                weatherCode={weatherDataHourly.weather_code[currentHour + index]}
                precipitationProbability={weatherDataHourly.precipitation_probability[currentHour + index]}
                windSpeed={weatherDataHourly.wind_speed_10m[currentHour + index]}
                windDirection={weatherDataHourly.wind_direction_10m[currentHour + index]}
                uvIndex={weatherDataHourly.uv_index[currentHour + index]}
              />
            ))}
          </Block>
        </ForecastCard>

        <ForecastCard title="7 day forecast">
          <Block display={"flex"} flexDirection={"column"} >
            {weatherDataDaily.time.slice(0, 7).map((date, index) => (
              <DailyForecastItem
                key={index}
                today={index === 0}
                date={date}
                temperatureMax={weatherDataDaily.temperature_2m_max[index]}
                temperatureMin={weatherDataDaily.temperature_2m_min[index]}
                weatherCode={weatherDataDaily.weather_code[index]}
                precipitationProbability={weatherDataDaily.precipitation_probability_max[index]}
                windSpeed={weatherDataDaily.wind_speed_10m_max[index]}
                windDirection={weatherDataDaily.wind_direction_10m_dominant[index]}
                humidity={weatherDataDaily.relative_humidity_2m_max[index]}
                uvIndex={weatherDataDaily.uv_index_max[index]}
              />
            ))}
          </Block>
        </ForecastCard>


        {/* Mobile only component */}
        {/* In Desktop it is rendered inside <CurrentWeatherCard /> */}
        <DayInformation
          display={["flex", "flex", "none", "none"]}
          childrenProps={{ width: "47%" }}
          precipitation={weatherDataHourly.precipitation[currentHour]}
          humidity={weatherDataHourly.relative_humidity_2m[currentHour]}
          windSpeed={weatherDataHourly.wind_speed_10m[currentHour]}
          windDirection={weatherDataHourly.wind_direction_10m[currentHour]}
          windGust={weatherDataHourly.wind_gusts_10m[currentHour]}
          uvIndex={weatherDataHourly.uv_index[currentHour]}
          aqi={weatherDataHourly.aqi[currentHour]}
        />

      </HeadingLevel>
    </Block>
  )
};

export default CityRoute;
