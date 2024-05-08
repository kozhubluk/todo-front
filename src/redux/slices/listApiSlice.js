import { apiSlice } from './apiSlice';

export const listApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLists: builder.query({
      query: () => ({ url: '/folders' }),
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'List', id })), { type: 'List', id: 'LIST' }]
          : [{ type: 'List', id: 'LIST' }],
    }),
    addList: builder.mutation({
      query: (body) => ({
        url: '/folders',
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: [{ type: 'List', id: 'LIST' }],
    }),
    updateList: builder.mutation({
      query: ({ id, body }) => ({
        url: `/folders/${id}`,
        method: 'PUT',
        body: { ...body },
      }),
      invalidatesTags: [{ type: 'List', id: 'LIST' }],
    }),
    deleteList: builder.mutation({
      query: (id) => ({
        url: `/folders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'List', id: 'LIST' },
        { type: 'Todo', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetListsQuery,
  useAddListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
} = listApiSlice;
