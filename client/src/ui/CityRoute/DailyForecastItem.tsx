import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Heading } from "baseui/heading";
import { weekdays } from "../../encode";
import HeadingWeightless from "../HeadingWeightless";
import WeatherIcon from "../WeatherIcon";

interface DailyForecastItemProps {
  today: boolean;
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  weatherCode: number;
  precipitationProbability: number;
}

const DailyForecastItem: React.FC<DailyForecastItemProps> = ({ today, date, temperatureMax, temperatureMin, weatherCode, precipitationProbability }) => {
  const [css, theme] = useStyletron();
  const day = today ? "Today" : weekdays[new Date(date).getDay()];

  return (
    <Block display={"flex"} alignItems={"center"} justifyContent={"space-between"} padding={"1rem 1rem"} width={"100%"}
      className={css({ borderTop: `1px solid ${theme.colors.primaryA}` })}
    >
      <Block width={"40%"}>
        <HeadingWeightless styleLevel={6} margin={0}>{day}</HeadingWeightless>
      </Block>
      <Block display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"60%"}>
        <Block display={"flex"} alignItems={"center"} gridGap={"0.25rem"}>
          <WeatherIcon weatherCode={997} size={1.5} />
          <Heading styleLevel={6} margin={0}>{precipitationProbability}%</Heading>
        </Block>
        <WeatherIcon weatherCode={weatherCode} size={2.5} />
        <Heading styleLevel={6} margin={0}>{temperatureMax.toFixed(0)}°</Heading>
        <Heading styleLevel={6} margin={0}>{temperatureMin.toFixed(0)}°</Heading>
      </Block>
    </Block>
  );
};

export default DailyForecastItem;