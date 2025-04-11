import { Block } from "baseui/block";
import { Heading } from "baseui/heading";
import { useStyletron } from "baseui";
import WeatherIcon from "../WeatherIcon";
import { angleToDirection, getUVRiskInfo, windUnit } from "../../services/weather";
import DataIcon from "../DataIcon";

interface HourlyForecastItemProps {
  hour: string;
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
  unitSystem: 'metric' | 'imperial';
}

const HourlyForecastItem: React.FC<HourlyForecastItemProps> = ({
  hour,
  temperature,
  weatherCode,
  precipitationProbability,
  windSpeed,
  windDirection,
  uvIndex,
  unitSystem
}) => {
  const [css, theme] = useStyletron();

  return (
    <Block 
      display={"flex"} 
      flexDirection={"column"} 
      gridGap={"1vh"} 
      alignItems={"center"} 
      padding={"1rem 1rem"} 
      width={["25vw", "25vw", "25vw", "12vw"]}
      className={css({ borderRight: `1px solid ${theme.colors.primaryA}`, flexShrink: '0' })}
    >
      <Heading styleLevel={6} margin={0}>{hour}</Heading>
      <WeatherIcon weatherCode={weatherCode} size={4} />
      <Heading styleLevel={3} margin={0}>{temperature.toFixed(0)}°</Heading>
      <Block 
        display={"flex"} 
        flexDirection={"column"} 
        alignItems={"start"} 
        justifyContent={"space-between"} 
        flexWrap={true}
      >
        <DataIcon 
          data={getUVRiskInfo(uvIndex).level}
          tooltip={"UV Index"}
          iconId={996}
          mobile={false}
        />
        <DataIcon 
          data={`${precipitationProbability}%`}
          tooltip={"Precipitation probability"}
          iconId={998}
          mobile={true}
        />
        <DataIcon 
          data={angleToDirection(windDirection, 'short').toString()}
          tooltip={"Wind direction"}
          iconId={995}
          mobile={false}
        />
        <DataIcon 
          data={`${windSpeed.toFixed(0)}${windUnit(unitSystem)}`}
          tooltip={"Wind speed"}
          iconId={994}
          mobile={false}
        />
      </Block>
    </Block>
  );
}

export default HourlyForecastItem;