import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Heading } from "baseui/heading";
import HeadingWeightless from "../HeadingWeightless";
import WeatherIcon from "../WeatherIcon";
import DataIcon from "../DataIcon";
import { weekdays, formatPrettyDate } from "../../services/time";
import { angleToDirection, getUVRiskInfo } from "../../services/weather";

interface DailyForecastItemProps {
  today: boolean;
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  weatherCode: number;
  precipitationProbability: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  uvIndex: number;
}

const DailyForecastItem: React.FC<DailyForecastItemProps> = ({
  today,
  date,
  temperatureMax,
  temperatureMin,
  weatherCode,
  precipitationProbability,
  windSpeed,
  windDirection,
  humidity,
  uvIndex
}) => {
  const [css, theme] = useStyletron();
  const day = today ? "Today" : weekdays[new Date(date).getDay()];
  const stringDate = formatPrettyDate(date);

  return (
    <Block
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={"1rem 1rem"}
      width={"100%"}
      className={css({ borderTop: `1px solid ${theme.colors.primaryA}` })}
    >
      <Block display={"flex"} flexDirection={"column"} alignItems={"center"} marginLeft={['0', '0', '0', '2vw']}>
        {/* Mobile only */}
        <Block display={["block", "block", "none", "none"]}>
          <HeadingWeightless styleLevel={6} margin={0}>{day}</HeadingWeightless>
        </Block>

        {/* Desktop only */}
        <Block display={["none", "none", "flex", "flex"]} flexDirection={"column"} alignItems={"center"} justifyContent={"space-between"}>
          <Heading styleLevel={6} margin={0}>{day}</Heading>
          <HeadingWeightless styleLevel={6} margin={"0 0 0.5rem 0"}>{stringDate}</HeadingWeightless>
          <WeatherIcon weatherCode={weatherCode} size={4} />
          <Heading styleLevel={3} margin={".5rem"}>{temperatureMax.toFixed(0)}° / {temperatureMin.toFixed(0)}°</Heading>
        </Block>
      </Block>

      {/* Mobile only */}
      <Block display={["flex", "flex", "none", "none"]} alignItems={"center"} justifyContent={"space-between"} width={"60%"}>
        <DataIcon
          data={`${precipitationProbability.toFixed(0)}%`}
          tooltip={`Precipitation probability`}
          iconId={998} mobile={true}
          width={"auto"}
        />
        <WeatherIcon weatherCode={weatherCode} size={2.5} />
        <Heading styleLevel={6} margin={0}>{temperatureMax.toFixed(0)}°</Heading>
        <Heading styleLevel={6} margin={0}>{temperatureMin.toFixed(0)}°</Heading>
      </Block>

      {/* Desktop only */}
      <Block 
        display={["none", "none", "flex", "flex"]} 
        alignItems={"center"} 
        justifyContent={"space-between"} 
        width={["0", "0", "75%", "60%"]} 
        flexWrap={true}
      >
        
        <Block display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"47%"}
          className={css({ borderBottom: `1px solid ${theme.colors.primaryA}` })}
        >
          <DataIcon
            data="Precipitation"
            iconId={998}
            iconSize={2}
            tooltip={`Precipitation probability: ${precipitationProbability.toFixed(0)}%`}
            mobile={false}
            width={"auto"}
          />
          <Heading styleLevel={6}>{precipitationProbability.toFixed(0)}%</Heading>
        </Block>

        <Block display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"47%"}
          className={css({ borderBottom: `1px solid ${theme.colors.primaryA}` })}
        >
          <DataIcon
            data="Wind"
            iconId={995}
            iconSize={2}
            tooltip={`Wind speeds: ${angleToDirection(windDirection)} ${windSpeed.toFixed(0)}km/h`}
            mobile={false}
            width={"auto"}
          />
          <Heading styleLevel={6}>{`${angleToDirection(windDirection, 'icon')} ${windSpeed.toFixed(0)}km/h`}</Heading>
        </Block>

        <Block display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"47%"} >
          <DataIcon
            data="Humidity"
            iconId={997}
            iconSize={2}
            tooltip={`Humidity: ${humidity.toFixed(0)}%`}
            mobile={false}
            width={"auto"}
          />
          <Heading styleLevel={6}>{humidity.toFixed(0)}%</Heading>
        </Block>

        <Block display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"47%"} >
          <DataIcon
            data="UV Index"
            iconId={996}
            iconSize={2}
            tooltip={`UV Index: ${getUVRiskInfo(uvIndex).level} (${uvIndex.toFixed(0)})`}
            mobile={false}
            width={"auto"}
          />
          <Heading styleLevel={6}>{getUVRiskInfo(uvIndex).level}</Heading>
        </Block>

      </Block>
    </Block>
  );
};

export default DailyForecastItem;