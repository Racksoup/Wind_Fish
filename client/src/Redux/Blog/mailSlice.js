import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  subscribed: false,
  newsletter: false,
};

export const selectSubscribed = (state) => state.mail.subscribed;
export const selectNewsletter = (state) => state.mail.newsletter;

export const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    subscribed: (state, action) => {
      state.subscribed = true;
    },
    newsletterSent: (state, action) => {
      state.newsletter = true;
    },
    unsubscribed: (state, action) => {
      state.subscribed = false;
    },
  },
});

export const subToNewsletter = (email, name) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, name });
  try {
    const res = await axios.post('/api/mailing/member', body, config);
    dispatch(subscribed(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const setUnsubbed = () => (dispatch) => {
  dispatch(unsubscribed());
};

export const sendNewsletter = (newsletter) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { text, link } = newsletter;
  const body = JSON.stringify({ text, link });
  try {
    const res = await axios.post('api/mailing/new-email', body, config);
    dispatch(newsletterSent(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const { newsletterSent, unsubscribed, subscribed } = mailSlice.actions;
export default mailSlice.reducer;
