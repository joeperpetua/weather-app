import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City } from "../types";

interface SettingsState {
  unitSystem: 'metric' | 'imperial';
  favoriteCities: City[];
}

const initialState: SettingsState = {
  unitSystem: localStorage.getItem('unitSystem') as 'metric' | 'imperial' || 'metric',
  favoriteCities: localStorage.getItem('favoriteCities') ? 
    JSON.parse(localStorage.getItem('favoriteCities') as string) : [],
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleUnitSystem: (state: SettingsState, action: PayloadAction<'metric' | 'imperial'>) => {
      state.unitSystem = action.payload === 'metric' ? 'imperial' : 'metric';
      localStorage.setItem('unitSystem', state.unitSystem);
    },
    toggleFavorite: (state: SettingsState, action: PayloadAction<City>) => {
      const city = state.favoriteCities.find(city => city.id === action.payload.id);

      if (city) {
        state.favoriteCities = state.favoriteCities.filter(city => city.id !== action.payload.id);
      } else {
        state.favoriteCities.push(action.payload);
      }

      localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities));
    }
  },
});

export const { toggleUnitSystem, toggleFavorite } = settingsSlice.actions;

export default settingsSlice.reducer;