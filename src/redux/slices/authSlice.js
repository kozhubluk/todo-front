const { createSlice } = require('@reduxjs/toolkit');

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, accessToken: null },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
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
