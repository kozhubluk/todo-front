import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { accessToken: null },
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.accessToken = null;
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
