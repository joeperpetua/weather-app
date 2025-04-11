import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './features/citiesSlice';
import settingsReducer from './features/settingsSlice';

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    settings: settingsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;