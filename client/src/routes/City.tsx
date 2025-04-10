import { Block } from "baseui/block";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchCities, fetchDailyForecast, fetchHourlyForecast, selectCityById, selectDailyForecastById, selectHourlyForecastById } from "../features/citiesSlice";
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

const CityRoute = () => {
  const { enqueue, dequeue } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.cities);
  const city = useSelector((state: RootState) => selectCityById(state.cities, Number(params.id) || -1));
  const dailyForecast = useSelector((state: RootState) => selectDailyForecastById(state.cities, Number(params.id) || -1));
  const hourlyForecast = useSelector((state: RootState) => selectHourlyForecastById(state.cities, Number(params.id) || -1));
  const currentHour = getLocalTimeTimezone(city?.timezone || '').hour;

  useEffect(() => {
    dispatch(fetchCities()).unwrap().catch(error => ErrorSnackbar('Failed to fetch cities.', error, enqueue, dequeue));

    dispatch(fetchDailyForecast(
      { id: Number(params.id) || -1, units: 'metric' }
    )).unwrap().catch(error => ErrorSnackbar('Failed to fetch daily forecast.', error, enqueue, dequeue));

    dispatch(fetchHourlyForecast(
      { id: Number(params.id) || -1, units: 'metric' }
    )).unwrap().catch(error => ErrorSnackbar('Failed to fetch daily forecast.', error, enqueue, dequeue));
  }, []);

  // Redirect in case the URL is malformed, but the id points to am existing city
  useEffect(() => {
    if (!city) return;
    if (cityURL(city) !== location.pathname) {
      navigate(cityURL(city));
    }
  }, [city]);

  if (loading || !dailyForecast || !hourlyForecast) return <PageSpinner />

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
          temperature={hourlyForecast.forecast.temperature[currentHour]}
          weatherCode={hourlyForecast.forecast.weatherCode[currentHour]}
          apparentTemperature={hourlyForecast.forecast.apparentTemperature[currentHour]}
          temperatureMin={dailyForecast.forecast.temperatureMin[0]}
          temperatureMax={dailyForecast.forecast.temperatureMax[0]}
          timezone={city.timezone}
          precipitation={hourlyForecast.forecast.precipitation[currentHour]}
          humidity={hourlyForecast.forecast.relativeHumidity[currentHour]}
          windSpeed={hourlyForecast.forecast.windSpeed[currentHour]}
          windDirection={hourlyForecast.forecast.windDirection[currentHour]}
          windGust={hourlyForecast.forecast.windGust[currentHour]}
          uvIndex={hourlyForecast.forecast.uvIndex[currentHour]}
          aqi={hourlyForecast.forecast.aqi[currentHour]}
        />

        <ForecastCard
          title="Weather today"
          time={`GMT${timezoneToGMT(city.timezone)}`}
        >
          <Block display={"flex"} gridGap={"1vw"} overflow={"auto"}>
            {hourlyForecast.forecast.date.slice(currentHour, currentHour + 24).map((hour, index) => (
              <HourlyForecastItem
                key={index}
                hour={hour.split('T')[1]}
                temperature={hourlyForecast.forecast.temperature[currentHour + index]}
                weatherCode={hourlyForecast.forecast.weatherCode[currentHour + index]}
                precipitationProbability={hourlyForecast.forecast.precipitationProbability[currentHour + index]}
                windSpeed={hourlyForecast.forecast.windSpeed[currentHour + index]}
                windDirection={hourlyForecast.forecast.windDirection[currentHour + index]}
                uvIndex={hourlyForecast.forecast.uvIndex[currentHour + index]}
              />
            ))}
          </Block>
        </ForecastCard>

        <ForecastCard title="7 day forecast">
          <Block display={"flex"} flexDirection={"column"} >
            {dailyForecast.forecast.date.slice(0, 7).map((date, index) => (
              <DailyForecastItem
                key={index}
                today={index === 0}
                date={date}
                temperatureMax={dailyForecast.forecast.temperatureMax[index]}
                temperatureMin={dailyForecast.forecast.temperatureMin[index]}
                weatherCode={dailyForecast.forecast.weatherCode[index]}
                precipitationProbability={dailyForecast.forecast.precipitationProbability[index]}
                windSpeed={dailyForecast.forecast.windSpeed[index]}
                windDirection={dailyForecast.forecast.windDirection[index]}
                humidity={dailyForecast.forecast.relativeHumidity[index]}
                uvIndex={dailyForecast.forecast.uvIndex[index]}
              />
            ))}
          </Block>
        </ForecastCard>


        {/* Mobile only component */}
        {/* In Desktop it is rendered inside <CurrentWeatherCard /> */}
        <DayInformation
          display={["flex", "flex", "none", "none"]}
          childrenProps={{ width: "47%" }}
          precipitation={hourlyForecast.forecast.precipitation[currentHour]}
          humidity={hourlyForecast.forecast.relativeHumidity[currentHour]}
          windSpeed={hourlyForecast.forecast.windSpeed[currentHour]}
          windDirection={hourlyForecast.forecast.windDirection[currentHour]}
          windGust={hourlyForecast.forecast.windGust[currentHour]}
          uvIndex={hourlyForecast.forecast.uvIndex[currentHour]}
          aqi={hourlyForecast.forecast.aqi[currentHour]}
        />

      </HeadingLevel>
    </Block>
  )
};

export default CityRoute;