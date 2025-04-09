import { City } from "./types";

export const cityURL = (city: City) => `/city/${city.countryCode.toLowerCase()}/${city.cityName.toLowerCase().replace(/ /g, '-')}/${city.id}`;

export const timezoneToGMT = (timezone: string) => {
  const date = new Date();
  const formatter = Intl.DateTimeFormat('en', { timeZone: timezone, timeZoneName: 'short' });
  const parts = formatter.formatToParts(date);

  const offset = parts.find(part => part.type === 'timeZoneName')?.value.split('GMT')[1];

  return offset !== undefined ? offset : null;
}

export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export const getLocalTimeTimezone = (timezone: string, date: Date = new Date()) => {
  // 'en' locale, 'u' extension, 'hc' key for hourCycle, 'h23' value (0-23)
  const formatter = new Intl.DateTimeFormat('en-u-hc-h23', { 
    timeZone: timezone,
    hour: 'numeric',
    minute: 'numeric'
  });
  const time = formatter.format(date).split(':');
	
  return {'hour': parseInt(time[0]), 'minute': parseInt(time[1])}
};

export const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const angleToDirection = (angle: number, short: boolean) => {

  const directions = [
    { name: "North", shortName: "N", arrow: "↑" },
    { name: "Northeast", shortName: "NE", arrow: "↗" },
    { name: "East", shortName: "E", arrow: "→" },
    { name: "Southeast", shortName: "SE", arrow: "↘" },
    { name: "South", shortName: "S", arrow: "↓" },
    { name: "Southwest", shortName: "SW", arrow: "↙" },
    { name: "West", shortName: "W", arrow: "←" },
    { name: "Northwest", shortName: "NW", arrow: "↖" },
  ];

  // Divide 360° into 8 equal segments of 45°
  const index = Math.round(angle / 45) % 8;

  return short ? directions[index].arrow : directions[index];
}

type UVRiskLevel = {
  min: number;
  max: number;
  level: string;
  color: string;
};

const uvIndexMap: UVRiskLevel[] = [
  {
    min: 0,
    max: 2,
    level: "Low",
    color: "green"
  },
  {
    min: 3,
    max: 5,
    level: "Moderate",
    color: "yellow"
  },
  {
    min: 6,
    max: 7,
    level: "High",
    color: "orange"
  },
  {
    min: 8,
    max: 10,
    level: "Very High",
    color: "red"
  },
  {
    min: 11,
    max: Infinity,
    level: "Extreme",
    color: "purple"
  },
];

export const getUVRiskInfo = (index: number): UVRiskLevel => {
  return (
    uvIndexMap.find((range) => index >= range.min && index <= range.max) ??
    uvIndexMap[uvIndexMap.length - 1]
  );
}

type AQLevel = {
  min: number;
  max: number;
  level: string;
  color: string;
};

const euAQIMap: AQLevel[] = [
  {
    min: 0,
    max: 20,
    level: "Good",
    color: "#50f0e6",

  },
  {
    min: 21,
    max: 40,
    level: "Fair",
    color: "#50ccaa",

  },
  {
    min: 41,
    max: 60,
    level: "Moderate",
    color: "#f0e641",

  },
  {
    min: 61,
    max: 80,
    level: "Poor",
    color: "#ff5050",

  },
  {
    min: 81,
    max: 100,
    level: "Very Poor",
    color: "#960032",
  },
  {
    min: 101,
    max: Infinity,
    level: "Hazardous",
    color: "#7d2181",
  }
];

const usAQIMap: AQLevel[] = [
  {
    min: 0,
    max: 50,
    level: "Good",
    color: "#50ccaa",

  },
  {
    min: 51,
    max: 100,
    level: "Moderate",
    color: "#f0e641",

  },
  {
    min: 101,
    max: 150,
    level: "Unhealthy for Sensitive Groups",
    color: "#f0a741",

  },
  {
    min: 151,
    max: 200,
    level: "Unhealthy",
    color: "#ff5050",

  },
  {
    min: 201,
    max: 300,
    level: "Very Unhealthy",
    color: "#960032",

  },
  {
    min: 301,
    max: Infinity,
    level: "Hazardous",
    color: "#7d2181",

  },
];

export const getAQI = (index: number, standard: "eu" | "us"): AQLevel => {
  if (standard === "us") return (
    usAQIMap.find((range) => index >= range.min && index <= range.max) ??
    usAQIMap[usAQIMap.length - 1]
  );

  return (
    euAQIMap.find((range) => index >= range.min && index <= range.max) ??
    euAQIMap[euAQIMap.length - 1]
  );
}

type WMOCodeInfo = {
  code: number;
  description: string;
};

const wmoCodeMap: WMOCodeInfo[] = [
  { code: 0, description: "Clear sky" },
  { code: 1, description: "Mainly clear" },
  { code: 2, description: "Partly cloudy" },
  { code: 3, description: "Overcast" },
  { code: 45, description: "Fog" },
  { code: 48, description: "Depositing rime fog" },
  { code: 51, description: "Light drizzle" },
  { code: 53, description: "Moderate intensity drizzle" },
  { code: 55, description: "Dense intensity drizzle" },
  { code: 56, description: "Light freezing drizzle" },
  { code: 57, description: "Dense freezing drizzle" },
  { code: 61, description: "Slight rain" },
  { code: 63, description: "Moderate rain" },
  { code: 65, description: "Heavy rain" },
  { code: 66, description: "Light freezing rain" },
  { code: 67, description: "Heavy freezing rain" },
  { code: 71, description: "Slight snowfall" },
  { code: 73, description: "Moderate snowfall" },
  { code: 75, description: "Heavy snowfall" },
  { code: 77, description: "Snow grains" },
  { code: 80, description: "Slight rain showers" },
  { code: 81, description: "Moderate rain showers" },
  { code: 82, description: "Violent rain showers" },
  { code: 85, description: "Slight snow showers" },
  { code: 86, description: "Heavy snow showers" },
  { code: 95, description: "Thunderstorm" },
  { code: 96, description: "Thunderstorm with slight hail" },
  { code: 99, description: "Thunderstorm with heavy hail" },
];

export function getWeatherDescription(code: number) {
  return (
    wmoCodeMap.find(entry => entry.code === code)?.description || null
  );
}
