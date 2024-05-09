import { apiSlice } from './apiSlice';

export const subtaskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubtasks: builder.query({
      query: (todoId) => ({ url: `${todoId}/subtasks` }),
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Subtask', id })), { type: 'Subtask', id: 'LIST' }]
          : [{ type: 'Subtask', id: 'LIST' }],
    }),
    addSubtask: builder.mutation({
      query: ({ todoId, body }) => ({
        url: `${todoId}/subtasks`,
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: [{ type: 'Subtask', id: 'LIST' }],
    }),
    updateSubtask: builder.mutation({
      query: ({ id, body }) => ({
        url: `/subtasks/${id}`,
        method: 'PUT',
        body: { ...body },
      }),
      invalidatesTags: [{ type: 'Subtask', id: 'LIST' }],
    }),
    deleteSubtask: builder.mutation({
      query: (id) => ({
        url: `/subtasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Subtask', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetSubtasksQuery,
  useAddSubtaskMutation,
  useUpdateSubtaskMutation,
  useDeleteSubtaskMutation,
} = subtaskApiSlice;
