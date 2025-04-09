import { Block } from "baseui/block";
import { Heading } from "baseui/heading";
import { useStyletron } from "baseui";
import WeatherIcon from "../WeatherIcon";
import HeadingWeightless from "../HeadingWeightless";

interface HourlyForecastItemProps {
  hour: string;
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
}

const HourlyForecastItem: React.FC<HourlyForecastItemProps> = ({ hour, temperature, weatherCode, precipitationProbability }) => {
  const [css, theme] = useStyletron();

  return (
    <Block display={"flex"} flexDirection={"column"} gridGap={"1vh"} alignItems={"center"} padding={"1rem 1rem"}
      className={css({ borderRight: `1px solid ${theme.colors.primaryA}` })}
    >
      <Heading styleLevel={6} margin={0}>{hour}</Heading>
      <WeatherIcon weatherCode={weatherCode} size={4} />
      <Heading styleLevel={3} margin={0}>{temperature.toFixed(0)}°</Heading>
      <Block display={"flex"} alignItems={"center"} gridGap={"0.25rem"}>
        <WeatherIcon weatherCode={997} size={1.5} />
        <HeadingWeightless styleLevel={6} margin={0}>{precipitationProbability}%</HeadingWeightless>
      </Block>
    </Block>
  );
}

export default HourlyForecastItem;