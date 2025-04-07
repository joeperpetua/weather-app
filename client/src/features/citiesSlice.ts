import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { City } from "../types";
import { throwOnAPIError, unknownToError } from "../error";

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
      const response = await fetch("http://localhost:8000/cities");

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
      const response = await fetch(`http://localhost:8000/city/${args.id}/edit`, {
        method: "PUT",
        body: JSON.stringify(args.city),
        headers: {
          Authorization: `Bearer ${args.token}`
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
      const response = await fetch(`http://localhost:8000/city/add`, {
        method: "POST",
        body: JSON.stringify(args.city),
        headers: {
          Authorization: `Bearer ${args.token}`
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

// Redux slice
const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cases
      .addCase(fetchCities.pending, (state) => {
        console.log('pending');
        state.loading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        console.log('fulfilled');
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.loading = false;
      })

      // Update cases
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
      .addCase(updateCity.rejected, (state) => {
        state.loading = false;
      })

      // Add cases
      .addCase(addCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCity.fulfilled, (state, action) => {
        state.loading = false;
        state.cities.push(action.payload);
      })
      .addCase(addCity.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Export actions
// export const { setCities } = citiesSlice.actions;
export const selectCityByName = (state: CitiesState, name: string) => state.cities.find(city => city.cityName === name) || null;
export default citiesSlice.reducer;