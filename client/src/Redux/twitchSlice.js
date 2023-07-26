import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isOnline: false
};

export const selectIsOnline = (state) => state.twitch.isOnline;

export const twitchSlice = createSlice({
  name: 'twitch',
  initialState,
  reducers: {
    gotOnline: (state, action) => {
      state.isOnline = action.payload
    }
  }
})

export const getOnline = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/twitch/online');
    dispatch(gotOnline(res.data));
  } catch (err) {
    console.log(err.message)
  }
}

export const {gotOnline} = twitchSlice.actions;
export default twitchSlice.reducer;