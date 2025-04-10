import { City } from "../types";

export const cityURL = (city: City) => `/city/${city.countryCode.toLowerCase()}/${city.cityName.toLowerCase().replace(/ /g, '-')}/${city.id}`;