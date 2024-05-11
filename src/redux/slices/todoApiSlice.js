import { apiSlice } from './apiSlice';

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({ params, id }) => ({
        url: `${id ? `/${id}` : ''}/todos`,
        params,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Todo', id })), { type: 'Todo', id: 'LIST' }]
          : [{ type: 'Todo', id: 'LIST' }],
    }),
    getTodosByList: builder.query({
      query: (id) => ({
        url: `${id}/todos`,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Todo', id })), { type: 'Todo', id: 'LIST' }]
          : [{ type: 'Todo', id: 'LIST' }],
    }),
    getTodo: builder.query({
      query: (id) => ({ url: `/todos/${id}` }),
      providesTags: (result, error, arg) => [
        { type: 'Todo', id: arg },
        { type: 'Todo', id: 'LIST' },
      ],
    }),
    addTodo: builder.mutation({
      query: (body) => ({
        url: '/todos',
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
    updateTodo: builder.mutation({
      query: ({ id, body }) => ({
        url: `/todos/${id}`,
        method: 'PUT',
        body: { ...body },
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'Todo', id: 'LIST' },
        { type: 'Subtask', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodosByListQuery,
  useGetTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApiSlice;
