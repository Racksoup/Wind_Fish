import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isOnline: false,
  clips: null,  
};

export const selectIsOnline = (state) => state.twitch.isOnline;
export const selectClips = (state) => state.twitch.clips;

export const twitchSlice = createSlice({
  name: 'twitch',
  initialState,
  reducers: {
    gotOnline: (state, action) => {
      state.isOnline = action.payload;
    },
    gotClips: (state, action) => {
      state.clips = action.payload.data;
    },
  },
});

export const getOnline = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/twitch/online');
    dispatch(gotOnline(res.data));
  } catch (err) {
    console.log(err.message);
  }
};

export const getClips = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/twitch/clips');
    dispatch(gotClips(res.data));
  } catch (err) {
    console.log(err.message);
  }
};

export const { gotOnline, gotClips, authVerified } = twitchSlice.actions;
export default twitchSlice.reducer;
