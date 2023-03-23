import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  videos: null,
};

export const selectVideos = (state) => state.youtube.videos;

export const youtubeSlice = createSlice({
  name: 'youtube',
  initialState,
  reducers: {
    gotYoutube: (state, action) => {
      state.videos = action.payload;
    },
  },
});

export const getYoutube = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/youtubev3`);
    dispatch(gotYoutube(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const { gotYoutube } = youtubeSlice.actions;
export default youtubeSlice.reducer;
