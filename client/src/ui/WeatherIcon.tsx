import clearSky from "../assets/weather_icons/clear-sky.png";
import partlyCloudy from "../assets/weather_icons/partly-cloudy.png";
import clouds from "../assets/weather_icons/clouds.png";
import cloudLightning from "../assets/weather_icons/cloud-lightning.png";
import rain from "../assets/weather_icons/rain.png";
import rainCloud from "../assets/weather_icons/rain-cloud.png";
import snow from "../assets/weather_icons/snow.png";
import temperature from "../assets/weather_icons/temperature.png";
import { Block } from "baseui/block";
import wind from "../assets/weather_icons/wind.png";
import wet from "../assets/weather_icons/wet.png";
import waterDrop from "../assets/weather_icons/water-drop.png";
import windsock from "../assets/weather_icons/windsock.png";
import uvIndex from "../assets/weather_icons/uv-index.png";

export const iconsMap: { [key: number]: string } = {
  0: clearSky,
  1: partlyCloudy,   // mainly clear
  2: clouds,         // partly cloudy
  3: clouds,         // overcast
  45: rain,          // fog (can change to fog icon if available)
  48: rainCloud,     // rime fog (could use a fog icon too)

  51: rain,          // light drizzle
  53: rain,          // moderate drizzle
  55: rain,          // dense drizzle

  56: rainCloud,     // light freezing drizzle
  57: rainCloud,     // dense freezing drizzle

  61: rain,          // slight rain
  63: rain,          // moderate rain
  65: rain,          // heavy rain

  66: rainCloud,     // light freezing rain
  67: rainCloud,     // heavy freezing rain

  71: snow,          // slight snowfall
  73: snow,          // moderate snowfall
  75: snow,          // heavy snowfall

  77: snow,          // snow grains

  80: rain,          // slight rain showers
  81: rain,          // moderate rain showers
  82: rain,          // violent rain showers

  85: snow,          // slight snow showers
  86: snow,          // heavy snow showers

  95: cloudLightning, // thunderstorm
  96: cloudLightning, // thunderstorm with slight hail
  99: cloudLightning, // thunderstorm with heavy hail

  // Custom icons
  994: wind,
  995: windsock,
  996: uvIndex,
  997: waterDrop,     // humidity
  998: wet,           // precipitation chance / precipitation sum 
  999: temperature
};



interface WeatherIconProps {
  weatherCode: number;
  size?: number
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ weatherCode, size = 3.5 }) => {
  return <Block as="img" src={iconsMap[weatherCode]} width={`${size}rem`} height={`${size}rem`} alt={`${weatherCode}`} />
}

export default WeatherIcon;