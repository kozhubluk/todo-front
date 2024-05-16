import SubtaskItem, { NewSubtaskButton, NewSubtaskItem } from '../SubtaskItem/SubtaskItem';
import {
  useAddSubtaskMutation,
  useDeleteSubtaskMutation,
  useGetSubtasksQuery,
  useUpdateSubtaskMutation,
} from '../../redux/slices/subtaskApiSlice';
import { useRef } from 'react';

const SubtasksList = ({ todoId }) => {
  // подзадачи
  const { data: subtasks, isLoading, isError } = useGetSubtasksQuery(todoId || 0);
  const [addSubtask] = useAddSubtaskMutation();
  const [updateSubtask] = useUpdateSubtaskMutation();
  const [deleteSubtask] = useDeleteSubtaskMutation();

  const subtaskInput = useRef(null);

  return (
    <>
      <div className="todo-form__subtasks">
        {!isLoading &&
          !isError &&
          subtasks.map((subtask) => (
            <SubtaskItem
              key={subtask.id}
              data={subtask}
              deleteHandler={async () => {
                await deleteSubtask(subtask.id);
              }}
              toggleHandler={async () => {
                await updateSubtask({
                  id: subtask.id,
                  body: { completed: !subtask.completed },
                });
              }}
              onBlurHandler={async (text) => {
                await updateSubtask({ id: subtask.id, body: { title: text } });
              }}
            />
          ))}
        <NewSubtaskItem
          onBlurHandler={async (text) => {
            await addSubtask({ todoId: todoId, body: { title: text, completed: false } });
          }}
          visibility={document.activeElement === subtaskInput.current}
          inputRef={subtaskInput}
        />
        <NewSubtaskButton
          onClick={() => {
            subtaskInput.current.focus();
          }}
        />
      </div>
    </>
  );
};

export default SubtasksList;
