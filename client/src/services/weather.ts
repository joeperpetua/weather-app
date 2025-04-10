import { UVAQILevel, WMOCodeInfo } from "../types";

const uvIndexMap: UVAQILevel[] = [
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

const euAQIMap: UVAQILevel[] = [
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

const usAQIMap: UVAQILevel[] = [
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


export const angleToDirection = (angle: number, format: "short" | "long" | "icon" = "short") => {

  const directions = [
    { long: "North", short: "N", icon: "↑" },
    { long: "Northeast", short: "NE", icon: "↗" },
    { long: "East", short: "E", icon: "→" },
    { long: "Southeast", short: "SE", icon: "↘" },
    { long: "South", short: "S", icon: "↓" },
    { long: "Southwest", short: "SW", icon: "↙" },
    { long: "West", short: "W", icon: "←" },
    { long: "Northwest", short: "NW", icon: "↖" },
  ];

  // Divide 360° into 8 equal segments of 45°
  const index = Math.round(angle / 45) % 8;

  return directions[index][format];
}

const getIndex = (map: UVAQILevel[], index: number) => {
  return map.find((range) => index >= range.min && index <= range.max) ?? uvIndexMap[uvIndexMap.length - 1];
}

export const getUVRiskInfo = (index: number) => getIndex(uvIndexMap, index);

export const getAQI = (index: number, standard: "eu" | "us") => {
  if (standard === "us") 
    return getIndex(usAQIMap, index);
  return getIndex(euAQIMap, index);
}

export const getWeatherDescription = (code: number) =>  wmoCodeMap.find(entry => entry.code === code)?.description ?? '';

