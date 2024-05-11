import SubtaskItem, { NewSubtaskButton, NewSubtaskItem } from '../SubtaskItem/SubtaskItem';
import {
  useAddSubtaskMutation,
  useDeleteSubtaskMutation,
  useGetSubtasksQuery,
  useUpdateSubtaskMutation,
} from '../../redux/slices/subtaskApiSlice';
import { useRef } from 'react';

const SubtasksList = ({ todoId, setSnackbar }) => {
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
                await deleteSubtask(subtask.id)
                  .unwrap()
                  .then(() => {
                    setSnackbar('Подзадача удалена');
                  })
                  .catch((error) => {
                    setSnackbar(error.data);
                  });
              }}
              toggleHandler={async () => {
                await updateSubtask({ id: subtask.id, body: { completed: !subtask.completed } })
                  .unwrap()
                  .then(() => {
                    setSnackbar('Подзадача обновлена');
                  })
                  .catch((error) => {
                    setSnackbar(error.data);
                  });
              }}
              onBlurHandler={async (text) => {
                await updateSubtask({ id: subtask.id, body: { title: text } })
                  .unwrap()
                  .then(() => {
                    setSnackbar('Подзадача обновлена');
                  })
                  .catch((error) => {
                    setSnackbar(error.data);
                  });
              }}
            />
          ))}
        <NewSubtaskItem
          onBlurHandler={async (text) => {
            await addSubtask({ todoId: todoId, body: { title: text, completed: false } })
              .unwrap()
              .then(() => {
                setSnackbar('Подзадача добавлена');
              })
              .catch((error) => {
                setSnackbar(error.data);
              });
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
