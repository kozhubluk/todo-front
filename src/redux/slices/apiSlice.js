import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { setCredentials, logout } from './authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const customBaseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 401) {
    console.log('need refresh token');
  } else {
    api.dispatch(logout);
  }

  return result;
};

export const apiSlice = createApi({ baseQuery: customBaseQuery, endpoints: (builder) => ({}) });
