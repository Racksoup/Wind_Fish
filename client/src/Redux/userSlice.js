import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuth: false,
  userToken: localStorage.getItem('userToken'),
  name: null,
};

export const selectIsAuth = (state) => state.user.isAuth;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authVerified: (state, action) => {
      state.isAuth = action.payload.isAuth;
      localStorage.setItem('userToken', action.payload.token);
      state.name = action.payload.login;
    },
  },
});


export const verifyAuth = (token) => async (dispatch) => {
  localStorage.removeItem('userToken');

  if (token) {  
    const data = {
      token
    } 

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };


    try {
      const res = await axios.post('/api/twitch/user-auth', data, config)
      dispatch(authVerified(res.data));
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const { authVerified } = userSlice.actions;
export default userSlice.reducer;

//http://localhost:8080/#access_token=nu3qgpwok3p4har5dw6v73kwq1a6go&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f002671&token_type=bearer