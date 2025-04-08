import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { City } from "../types";
import { throwOnAPIError, unknownToError } from "../error";
import { store } from "../store";

interface CitiesState {
  cities: City[];
  loading: boolean;
}

const initialState: CitiesState = {
  cities: [],
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

// Redux slice
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
      });
  },
});

// Export actions
// export const { setCities } = citiesSlice.actions;
export const selectCityByName = (state: CitiesState, name: string) => state.cities.find(city => city.cityName === name) || null;
export const selectCityById = (state: CitiesState, id: number) => state.cities.find(city => city.id === id) || null;
export default citiesSlice.reducer;