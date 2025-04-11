
import { City } from "../types";
import { HeadingMedium } from "baseui/typography";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Link } from "react-router";
import { cityURL } from "../services/url";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDailyForecast, fetchHourlyForecast, selectDailyForecastById, selectHourlyForecastById } from "../features/citiesSlice";
import ErrorSnackbar from "./Snackbar/Error";
import { useSnackbar } from "baseui/snackbar";
import { getLocalTimeTimezone } from "../services/time";
import PageSpinner from "./PageSpinner";
import { Content } from "./CityRoute/CurrentWeatherCard";

interface CityCardProps {
  city: City;
}

// Define here cause it seems like React doesn't detect the one defined in card.js
// If not defined, component crashes with `Uncaught TypeError: hasThumbnail2 is not a function`
// const hasThumbnail = (_props: { readonly thumbnail?: string | undefined; }) => true

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const [css, theme] = useStyletron();
  const dispatch = useDispatch<AppDispatch>();
  const { enqueue, dequeue } = useSnackbar();
  const { unitSystem } = useSelector((state: RootState) => state.settings);
  const dailyForecast = useSelector((state: RootState) => selectDailyForecastById(state.cities, Number(city.id) || -1));
  const hourlyForecast = useSelector((state: RootState) => selectHourlyForecastById(state.cities, Number(city.id) || -1));
  const currentTime = getLocalTimeTimezone(city.timezone || '');

  useEffect(() => {
    dispatch(fetchDailyForecast(
      { id: Number(city.id) || -1, units: unitSystem }
    )).unwrap().catch(error => ErrorSnackbar('Failed to fetch daily forecast.', error, enqueue, dequeue));

    dispatch(fetchHourlyForecast(
      { id: Number(city.id) || -1, units: unitSystem }
    )).unwrap().catch(error => ErrorSnackbar('Failed to fetch daily forecast.', error, enqueue, dequeue));
  }, [unitSystem]);

  return (
    <Block>
      {/* Mobile only component */}
      <Block display={["flex", "flex","flex", "flex"]} flexDirection={"column"} marginTop={"1rem"} minWidth={["100%", "100%", "20vw", "23vw"]}>
        {(hourlyForecast && dailyForecast) ? (
          <Link to={cityURL(city)} style={{ textDecoration: 'none' }}>
            <Block display={"flex"} flexDirection={"column"} backgroundColor={theme.colors.backgroundTertiary} padding={"2rem"} 
              className={css({ borderRadius: "1rem" })}
            >
              <HeadingMedium margin={0}>{`${city.cityName}, ${city.countryCode}`}</HeadingMedium>
              <Content
                temperature={hourlyForecast.forecast.temperature[currentTime.hour]}
                weatherCode={hourlyForecast.forecast.weatherCode[currentTime.hour]}
                apparentTemperature={hourlyForecast.forecast.apparentTemperature[currentTime.hour]}
                temperatureMin={dailyForecast.forecast.temperatureMin[0]}
                temperatureMax={dailyForecast.forecast.temperatureMax[0]}
              />
            </Block>
          </Link>
        ) : (
          <PageSpinner />
        )}
      </Block>
    </Block>
  );
}

export default CityCard;