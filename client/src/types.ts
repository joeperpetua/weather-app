// API Related types

export interface APIError {
  type: string;
  status: number;
  title: string;
  detail: string;
}

export interface City {
  id?: number;
  cityName: string;
  country: string;
  countryCode: string;
  coordinates: {
    lat: number;
    lon: number;
  },
  adminZone1?: string;
  adminZone2?: string;
  timezone: string;
}

export interface GeocodingData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  admin3_id: number;
  admin4_id: number;
  timezone: string;
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
}

export interface DailyForecast {
  date: string[];
  precipitationProbability: number[];
  relativeHumidity: number[];
  temperatureMax: number[];
  temperatureMin: number[];
  uvIndex: number[];
  weatherCode: number[];
  windDirection: number[];
  windSpeed: number[];
  units: 'metric' | 'imperial';
}

export interface HourlyForecast {
  date: string[];
  precipitation: number[];
  precipitationProbability: number[];
  relativeHumidity: number[];
  temperature: number[];
  uvIndex: number[];
  weatherCode: number[];
  windDirection: number[];
  windGust: number[];
  windSpeed: number[];
  apparentTemperature: number[];
  aqi: number[];
  units: 'metric' | 'imperial';
}

// Internal types
export type CityRowData = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  number,
  string
];

export interface UVAQILevel {
  min: number;
  max: number;
  level: string;
  color: string;
};

export interface WMOCodeInfo {
  code: number;
  description: string;
};