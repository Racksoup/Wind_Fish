import setAuthToken from './Utils/setAuthToken';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuth: false,
  token: localStorage.getItem('token'),
  user: null,
};

export const selectIsAuth = (state) => state.user.isAuth;
export const selectToken = (state) => state.user.token;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authVerifiedTwitch: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload
    },
    authDenied: (state, action) => {
      localStorage.removeItem('token');
      state.isAuth = false;
      state.user = null;
    },
    gotUser: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    }
  },
});


export const twitchLogin = (code) => async (dispatch) => {
  if (!code) {
    dispatch(authDenied());
  }
  
  const data = {
    code
  } 
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  
  try {
    const res = await axios.post('/api/twitch/user-auth', data, config)
    dispatch(authVerifiedTwitch(res.data));
    window.location.href = 'http://localhost:8080'
  } catch (err) {
    // dispatch(authDenied())
    console.log(err.message)
  }
}

export const getUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    if (localStorage.token) {
      const res = await axios.get('/api/user');

      dispatch(gotUser(res.data))
    }
  } catch (error) {
    console.log(error.message)
  }
}

export const { authVerifiedTwitch, authDenied, gotUser } = userSlice.actions;
export default userSlice.reducer;

//http://localhost:8080/#access_token=nu3qgpwok3p4har5dw6v73kwq1a6go&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f002671&token_type=bearer