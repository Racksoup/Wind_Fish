import setAuthToken from './Utils/setAuthToken';
import { createSlice } from '@reduxjs/toolkit';
import { deleteAccountLikes } from './Blog/likesSlice';
import { deleteAccountComments } from './Blog/commentsSlice';
import axios from 'axios';

const initialState = {
  isAuth: false,
  token: localStorage.getItem('token'),
  user: null,
};

export const selectIsAuth = (state) => state.user.isAuth;
export const selectToken = (state) => state.user.token;
export const selectUser = (state) => state.user.user;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authVerifiedTwitch: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
    },
    authDenied: (state, action) => {
      localStorage.removeItem('token');
      state.isAuth = false;
      state.user = null;
    },
    gotUser: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    loggedoutTwitch: (state, action) => {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem('token');
      state.token = null;
    },
    userDeleted: (state, action) => {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem('token');
      state.token = null;
    },
    updatedUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const twitchLogin = (code) => async (dispatch) => {
  if (!code) {
    dispatch(authDenied());
  }

  const data = {
    code,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/twitch/user-auth', data, config);
    dispatch(authVerifiedTwitch(res.data));
    window.location.href = 'http://localhost:8080';
  } catch (err) {
    // dispatch(authDenied())
    console.log(err.message);
  }
};

export const getUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    if (localStorage.token) {
      const res = await axios.get('/api/user');

      dispatch(gotUser(res.data));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const twitchLogout = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/twitch/logout', {}, config);
    dispatch(loggedoutTwitch(res.data));
  } catch (error) {
    console.log(error.message);
  }
  setAuthToken(false);
};

export const deleteUser = () => async (dispatch) => {
  try {
    dispatch(deleteAccountLikes());
    dispatch(deleteAccountComments());
    const res = await axios.delete(`/api/user`);
    dispatch(twitchLogout());
    dispatch(userDeleted(res.data));
    setAuthToken(false);
  } catch (error) {
    console.log(error);
  }
};

export const {
  authVerifiedTwitch,
  authDenied,
  gotUser,
  loggedoutTwitch,
  userDeleted,
  updatedUser,
} = userSlice.actions;
export default userSlice.reducer;
