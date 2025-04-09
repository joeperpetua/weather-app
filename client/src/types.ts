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
  admin1?: string;
  admin2?: string;
  timezone?: string;
}

export type CityRowData = [
  number,
  string,
  string,
  string,
  number,
  number
];