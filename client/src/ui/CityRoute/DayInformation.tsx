import { useStyletron } from "baseui";
import { Block, BlockProps } from "baseui/block";
import { Heading } from "baseui/heading";
import { IoRainy } from "react-icons/io5";
import { angleToDirection, getUVRiskInfo, getAQI } from "../../services/weather";
import WeatherDataCard from "./WeatherDataCard";
import { WiHumidity } from "react-icons/wi";
import { GiWindsock } from "react-icons/gi";
import { FaWind } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { TbHexagons } from "react-icons/tb";

const ColorIndicator = ({ color }: { color: string }) => {
  const [css] = useStyletron();

  return (
    <Block
      marginRight={"0.5rem"}
      width={"1rem"}
      height={"1rem"}
      backgroundColor={color}
      className={css({ borderRadius: "50%" })}
    />
  );
};

interface DayInformationProps extends BlockProps {
  precipitation: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  windGust: number;
  uvIndex: number;
  aqi: number;
  childrenProps: BlockProps;
};

const DayInformation: React.FC<DayInformationProps> = ({
  precipitation,
  humidity,
  windSpeed,
  windDirection,
  windGust,
  uvIndex,
  aqi,
  childrenProps,
  ...props
}) => {
  const [css, theme] = useStyletron();

  return (
    <Block display={"flex"} flexWrap={true} justifyContent={"space-between"} {...props} >
      <WeatherDataCard
        title="Precipitation"
        icon={<IoRainy size={20} color={theme.colors.backgroundSecondary} />}
        {...childrenProps}
      >
        <Heading styleLevel={6} margin={0}>{precipitation.toFixed(0)}mm</Heading>
      </WeatherDataCard>

      <WeatherDataCard
        title="Humidity"
        icon={<WiHumidity size={20} color={theme.colors.backgroundSecondary} />}
        {...childrenProps}
      >
        <Heading styleLevel={6} margin={0}>{humidity.toFixed(0)}%</Heading>
      </WeatherDataCard>

      <WeatherDataCard
        title="Wind"
        icon={<GiWindsock size={20} color={theme.colors.backgroundSecondary} />}
        {...childrenProps}
      >
        <Heading styleLevel={6} margin={0}>
          {`${angleToDirection(windDirection, "icon")} ${windSpeed.toFixed(0)}km/h`}
        </Heading>
      </WeatherDataCard>

      <WeatherDataCard
        title="Wind Gusts"
        icon={<FaWind size={20} color={theme.colors.backgroundSecondary} />}
        {...childrenProps}
      >
        <Heading styleLevel={6} margin={0}>{windGust.toFixed(0)}km/h</Heading>
      </WeatherDataCard>

      <WeatherDataCard
        title="UV Index"
        icon={<MdSunny size={20} color={theme.colors.backgroundSecondary} />}
        {...childrenProps}
      >
        <Heading styleLevel={6} margin={0} display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <ColorIndicator color={getUVRiskInfo(uvIndex).color} />
          {`${getUVRiskInfo(uvIndex).level} (${uvIndex.toFixed(0)})`}
        </Heading>
      </WeatherDataCard>

      <WeatherDataCard
        title="Air Quality"
        icon={<TbHexagons size={20} color={theme.colors.backgroundSecondary} />}
        {...childrenProps}
      >
        <Heading styleLevel={6} margin={0} display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <ColorIndicator color={getAQI(aqi, "eu").color} />
          {`${getAQI(aqi, "eu").level} (${aqi.toFixed(0)})`}
        </Heading>
      </WeatherDataCard>
    </Block>
  )
}

export default DayInformation;