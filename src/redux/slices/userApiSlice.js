import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({ url: '/user' }),
      providesTags: (result, error, arg) => [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: '/user',
        method: 'PUT',
        body: { ...body },
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApiSlice;
