import sunny from "../assets/weather_icons/sunny.png";
import partlyCloudy from "../assets/weather_icons/partly-cloudy.png";
import clouds from "../assets/weather_icons/clouds.png";
import cloudLightning from "../assets/weather_icons/cloud-lightning.png";
import rain from "../assets/weather_icons/rain.png";
import rainCloud from "../assets/weather_icons/rain-cloud.png";
import snow from "../assets/weather_icons/snow.png";
import temperature from "../assets/weather_icons/temperature.png";
import { Block } from "baseui/block";
// import wind from "../assets/weather_icons/wind.png";
import wet from "../assets/weather_icons/wet.png";

export const iconsMap: { [key: number]: string } = {
  0: sunny,
  1: partlyCloudy,
  2: clouds,
  3: cloudLightning,
  45: rain,
  48: rainCloud,
  51: rain,
  53: rain,
  55: rain,
  56: rainCloud,
  57: rainCloud,
  61: rain,
  63: rain,
  65: rain,
  66: rainCloud,
  67: rainCloud,
  71: snow,
  73: snow,
  75: snow,
  998: wet,
  999: temperature
};


interface WeatherIconProps {
  weatherCode: number;
  size?: number
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ weatherCode, size = 48 }) => {
  return <Block as="img" src={iconsMap[weatherCode]} width={`${size}px`} height={`${size}px`} alt={`${weatherCode}`} />
}

export default WeatherIcon;