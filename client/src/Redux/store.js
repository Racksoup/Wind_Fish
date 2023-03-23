import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from './youtubeSlice';

export const store = configureStore({
  reducer: {
    youtube: youtubeReducer,
  },
});
