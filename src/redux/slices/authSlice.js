import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const authSlice = createSlice({
  name: 'auth',
  initialState: { accessToken: cookies.get('token') },
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      cookies.set('token', action.payload.accessToken);
    },
    logout: (state) => {
      state.accessToken = null;
      cookies.remove('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectUser = (state) => {
  return state.auth.user;
};

export const selectAccessToken = (state) => {
  return state.auth.accessToken;
};
