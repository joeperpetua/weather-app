import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { City, DailyForecast, HourlyForecast } from "../types";
import { throwOnAPIError, unknownToError } from "../error";
import { store } from "../store";

interface DailyForecastState {
  id: number;
  forecast: DailyForecast;
}

interface HourlyForecastState {
  id: number;
  forecast: HourlyForecast;
}

interface CitiesState {
  cities: City[];
  dailyForecasts: DailyForecastState[];
  hourlyForecasts: HourlyForecastState[];
  loading: boolean;
}

const initialState: CitiesState = {
  cities: [],
  dailyForecasts: [],
  hourlyForecasts: [],
  loading: false,
};

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (_: void, { rejectWithValue }) => {
    try {
      const citiesState = store.getState().cities;
      if (citiesState.cities.length > 0) {
        return citiesState.cities;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/cities`);

      await throwOnAPIError('Cities fetch', response);

      const cities = await response.json() as City[];

      return cities;
    } catch (error) {
      const parsed = unknownToError('Cities fetch', error);
      return rejectWithValue(parsed.error.message);
    }
  }
);

export const updateCity = createAsyncThunk(
  "cities/updateCity",
  async (args: { id: number, city: City, token: string | null }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/city/${args.id}/edit`, {
        method: "PUT",
        body: JSON.stringify(args.city),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${args.token}`
        }
      });

      await throwOnAPIError('City update', response);

      const city = await response.json() as City;

      return city;
    } catch (error) {
      const parsed = unknownToError('City update', error);
      return rejectWithValue(parsed.error.message);
    }
  }
);

export const addCity = createAsyncThunk(
  "cities/addCity",
  async (args: { city: City, token: string | null }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cities/add`, {
        method: "POST",
        body: JSON.stringify(args.city),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${args.token}`
        }
      });

      await throwOnAPIError('City add', response);

      const city = await response.json() as City;

      return city;
    } catch (error) {
      const parsed = unknownToError('City add', error);
      return rejectWithValue(parsed.error.message);
    }
  }
);

export const deleteCity = createAsyncThunk(
  "cities/deleteCity",
  async (args: { id: number, token: string | null }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/city/${args.id}/delete`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${args.token}`
        }
      });

      await throwOnAPIError('City delete', response);

      return args.id;
    } catch (error) {
      const parsed = unknownToError('City delete', error);
      return rejectWithValue(parsed.error.message);
    }
  }
);

export const fetchDailyForecast = createAsyncThunk(
  'cities/fetchDailyForecast',
  async (args: { id: number, units: 'metric' | 'imperial' }, { rejectWithValue }) => {
    try {
      const cityForecast = selectDailyForecastById(store.getState().cities, args.id);
      if (cityForecast && cityForecast.forecast.units === args.units) {
        return cityForecast;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/forecast/${args.id}/daily?days=7&units=${args.units}`);
      await throwOnAPIError('Daily forecast fetch', response);
      const forecast = await response.json() as DailyForecast;
      return { id: args.id, forecast };
    } catch (error) {
      const parsed = unknownToError('Daily forecast fetch', error);
      return rejectWithValue(parsed.error.message);
    }
  }
);

export const fetchHourlyForecast = createAsyncThunk(
  'cities/fetchHourlyForecast',
  async (args: { id: number, units: 'metric' | 'imperial' }, { rejectWithValue }) => {
    try {
      const cityForecast = selectHourlyForecastById(store.getState().cities, args.id);
      if (cityForecast && cityForecast.forecast.units === args.units) {
        return cityForecast;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/forecast/${args.id}/hourly?days=2&units=${args.units}`);
      await throwOnAPIError('Hourly forecast fetch', response);
      const forecast = await response.json() as HourlyForecast;
      return { id: args.id, forecast };
    } catch (error) {
      const parsed = unknownToError('Daily forecast fetch', error);
      return rejectWithValue(parsed.error.message);
    }
  }
);

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cases
      .addCase(fetchCities.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })

      // Update cases
      .addCase(updateCity.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = state.cities.map(city => {
          if (city.id === action.payload.id) {
            return action.payload;
          }
          return city;
        });
      })

      // Add cases
      .addCase(addCity.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCity.fulfilled, (state, action) => {
        state.loading = false;
        state.cities.push(action.payload);
      })

      // Delete cases
      .addCase(deleteCity.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = state.cities.filter(city => city.id !== action.payload);
      })

      // Fetch daily forecast cases
      .addCase(fetchDailyForecast.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchDailyForecast.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDailyForecast.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.dailyForecasts.findIndex(forecast => forecast.id === action.payload.id);

        if (index > -1) {
          state.dailyForecasts[index] = action.payload;
        } else {
          state.dailyForecasts.push(action.payload);
        }
      })

      // Fetch hourly forecast cases
      .addCase(fetchHourlyForecast.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchHourlyForecast.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.hourlyForecasts.findIndex(forecast => forecast.id === action.payload.id);

        if (index > -1) {
          state.hourlyForecasts[index] = action.payload;
        } else {
          state.hourlyForecasts.push(action.payload);
        }
      });
  },
});

// Export actions
// export const { setCities } = citiesSlice.actions;
export const selectCityByName = (state: CitiesState, name: string) => state.cities.find(city => city.cityName === name) || null;
export const selectCityById = (state: CitiesState, id: number) => state.cities.find(city => city.id === id) || null;
export const selectDailyForecastById = (state: CitiesState, id: number) => state.dailyForecasts.find(forecast => forecast.id === id) || null;
export const selectHourlyForecastById = (state: CitiesState, id: number) => state.hourlyForecasts.find(forecast => forecast.id === id) || null;
export default citiesSlice.reducer;