import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { DisplayLarge } from "baseui/typography";
import HeadingWeightless from "../HeadingWeightless";
import WeatherIcon from "../WeatherIcon";
import WeatherDataCard from "./WeatherDataCard";
import DayInformation from "./DayInformation";
import { timezoneToGMT, getLocalTimeTimezone } from "../../services/time";
import { getWeatherDescription } from "../../services/weather";
import { HeadingLevel } from "baseui/heading";

interface ContentProps {
  temperature: number;
  weatherCode: number;
  apparentTemperature: number;
  temperatureMin: number;
  temperatureMax: number;
}

interface CurrentWeatherCardProps extends ContentProps {
  // Needed only for desktop
  timezone: string;
  precipitation: number;
  windSpeed: number;
  windDirection: number;
  windGust: number;
  humidity: number;
  uvIndex: number;
  aqi: number;
  unitSystem: "metric" | "imperial";
}

export const Content: React.FC<ContentProps> = ({ temperature, weatherCode, apparentTemperature, temperatureMin, temperatureMax }) => {
  const [css] = useStyletron();

  return (
    <HeadingLevel>
      <Block display={"flex"} justifyContent={["space-between", "space-around"]} alignItems={"center"} width={"100%"}>
        <DisplayLarge marginBottom={0} className={css({ fontSize: "5.5rem" })}>{temperature}°</DisplayLarge>
        <WeatherIcon weatherCode={weatherCode} size={8} />
      </Block>

      <Block display={"flex"} flexDirection={"column"} justifyContent={"space-between"} gridGap={"3vh"} marginLeft={"2.5vw"}>
        <HeadingWeightless styleLevel={3} margin={0}>{getWeatherDescription(weatherCode)}</HeadingWeightless>
        <Block display={"flex"} flexDirection={"column"} gridGap={"1vh"}>
          <HeadingWeightless styleLevel={3} margin={0}>Feels like {apparentTemperature}°</HeadingWeightless>
          <HeadingWeightless styleLevel={3} margin={0}>{temperatureMax}° / {temperatureMin}°</HeadingWeightless>
        </Block>
      </Block>
    </HeadingLevel>
  );
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  temperature,
  weatherCode,
  apparentTemperature,
  temperatureMin,
  temperatureMax,
  timezone,
  precipitation,
  windSpeed,
  windDirection,
  windGust,
  humidity,
  uvIndex,
  aqi,
  unitSystem
}) => {
  const offset = timezoneToGMT(timezone);
  const { hour, minute } = getLocalTimeTimezone(timezone);

  return (
    <Block>
      {/* Mobile only component */}
      <Block display={["flex", "flex", "none", "none"]} flexDirection={"column"} marginTop={"1rem"}>
        <Content
          temperature={temperature}
          weatherCode={weatherCode}
          apparentTemperature={apparentTemperature}
          temperatureMin={temperatureMin}
          temperatureMax={temperatureMax}
        />
      </Block>

      {/* Desktop only component */}
      <Block display={["none", "none", "flex", "flex"]} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
        <WeatherDataCard
          title="Weather now"
          time={`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} (GMT${offset})`}
          width={["", "", "45%", "30%"]}
          display={["none", "none", "flex", "flex"]}
        >
          <Content
            temperature={temperature}
            weatherCode={weatherCode}
            apparentTemperature={apparentTemperature}
            temperatureMin={temperatureMin}
            temperatureMax={temperatureMax}
          />
        </WeatherDataCard>

        <DayInformation
          display={["none", "none", "flex", "flex"]}
          width={"50%"}
          height={"50%"}
          childrenProps={{ width: ["", "", "47%", "30%"] }}
          precipitation={precipitation}
          windSpeed={windSpeed}
          windDirection={windDirection}
          windGust={windGust}
          humidity={humidity}
          uvIndex={uvIndex}
          aqi={aqi}
          unitSystem={unitSystem}
        />
      </Block>

    </Block>

  );
};

export default CurrentWeatherCard;