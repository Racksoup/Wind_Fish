import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../Utils/setAuthToken';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export const selectToken = (state) => state.admin.token;
export const selectIsAuthenticated = (state) => state.admin.isAuthenticated;
export const selectLoading = (state) => state.admin.loading;
export const selectUser = (state) => state.admin.user;

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
    },
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    authError: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    userLoggedOut: (state, action) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    setLoading: (state, action) => {
      state.loading = true;
    },
  },
});

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    if (localStorage.token) {
      const res = await axios.get('/api/backend-blog/auth');
      dispatch(userLoaded(res.data));
    }
  } catch (err) {
    dispatch(authError());
  }
};

export const login = (username, password) => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ username, password });
  try {
    const res = await axios.post('/api/backend-blog/auth', body, config);
    dispatch(loginSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch(authError());
  }
};

export const logout = () => (dispatch) => {
  dispatch(userLoggedOut());
};

export const { loginSuccess, userLoaded, authError, userLoggedOut, setLoading } =
  adminSlice.actions;
export default adminSlice.reducer;
