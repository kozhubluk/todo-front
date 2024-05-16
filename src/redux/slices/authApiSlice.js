import { apiSlice } from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: ['List', 'User', 'Subtask', 'Todo'],
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: '/registration',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApiSlice;
