import { useEffect, useState } from 'react';
import ModalWrapper from '../Modal/ModalWrapper';
import TodoForm from '../TodoForm/TodoForm';
import TodoItem from '../TodoItem/TodoItem';
import './TodosList.scss';
import { getModalHanlder } from '../../utils/getModalHanlder';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Wrapper from '../Wrapper/Wrapper';
import TodoInput from '../TodoInput/TodoInput';
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from '../../redux/slices/todoApiSlice';
import { useGetListsQuery } from '../../redux/slices/listApiSlice';
import { Skeleton, Snackbar } from '@mui/material';
import { groupByDeadline } from '../../utils/groupTodos';
import { useSnackbar } from '../../hooks/Snackbar';

const TodosList = ({
  params = {},
  id,
  showForm = true,
  showOverdue = false,
  showProgressBar = true,
}) => {
  // Модальные окна
  const [modals, setModals] = useState({
    confirm: false,
    editTodo: false,
  });

  const confirmModal = getModalHanlder(modals, 'confirm', setModals);
  const editTodoModal = getModalHanlder(modals, 'editTodo', setModals);

  // snackbar
  const { open, message, handleClose, setSnackbar } = useSnackbar();

  // Текст для модального окна
  const confirmModalText = 'Вы уверены, что хотите удалить задачу?';

  // todo с которым производятся действия
  const [currentTodo, setCurrentTodo] = useState(null);

  // методы работы с todos

  const { data, isLoading } = useGetTodosQuery({ id, params });

  const [updateTodo, { isLoading: updateIsLoading }] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: deleteIsLoading }] = useDeleteTodoMutation();

  // списки
  const { data: lists, isLoading: listsIsLoading } = useGetListsQuery();

  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    if (data) {
      setGroupedData(groupByDeadline(data, showOverdue));
    }
  }, [data, showOverdue]);

  return (
    <Wrapper>
      <div className="today-container">
        {showForm && <TodoInput setSnackbar={setSnackbar} />}

        {!isLoading ? (
          Object.keys(groupedData).map((key) => (
            <div className="today-container__group" key={key}>
              {groupedData[key].items.length > 0 && <h2 key={key.date}>{groupedData[key].date}</h2>}
              {groupedData[key].items.map((item) => (
                <TodoItem
                  key={item.id}
                  data={item}
                  list={
                    item.folderId && !listsIsLoading
                      ? lists.find((list) => item.folderId === list.id)?.title
                      : null
                  }
                  toggleHandler={async () => {
                    await updateTodo({ id: item.id, body: { completed: !item.completed } })
                      .unwrap()
                      .then((payload) => {
                        const msg = payload.completed
                          ? 'Задача пермещена в Выполненное'
                          : 'Задача перемешена во Входящие';
                        setSnackbar(msg);
                      })
                      .catch((error) => {
                        setSnackbar(error.data);
                      });
                  }}
                  updateIsLoading={updateIsLoading}
                  actionHandler={() => {
                    if (!item.completed) {
                      setCurrentTodo(item);
                      editTodoModal.open();
                    }
                  }}
                  deleteHandler={() => {
                    setCurrentTodo(item);
                    confirmModal.open();
                  }}
                />
              ))}
            </div>
          ))
        ) : (
          <>
            <Skeleton variant="rectangular" sx={{ bgcolor: 'grey.900', borderRadius: '10px' }}>
              <h2>Загрузка данных</h2>
            </Skeleton>
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                className="todo-item"
                sx={{ bgcolor: 'grey.900' }}
              />
            ))}
          </>
        )}

        <ModalWrapper
          active={editTodoModal.isOpen}
          closeModal={() => {
            editTodoModal.close();
            setCurrentTodo(null);
          }}>
          <TodoForm
            data={currentTodo}
            updateTodo={async (body) => {
              await updateTodo({ id: currentTodo.id, body })
                .unwrap()
                .then(() => {
                  setSnackbar('Задача обновлена');
                })
                .catch((error) => {
                  setSnackbar(error.data);
                });
              setCurrentTodo(null);
              editTodoModal.close();
            }}></TodoForm>
        </ModalWrapper>
        <ConfirmModal
          active={confirmModal.isOpen}
          closeModal={confirmModal.close}
          confirmHandler={async () => {
            await deleteTodo(currentTodo.id)
              .unwrap()
              .catch((error) => {
                setSnackbar(error.data);
              });
            confirmModal.close();
          }}
          isLoading={deleteIsLoading}
          cancelHandler={confirmModal.close}>
          {confirmModalText}
        </ConfirmModal>

        <Snackbar
          sx={{ zIndex: '5000' }}
          open={open}
          autoHideDuration={1500}
          message={message}
          onClose={handleClose}
        />
      </div>
    </Wrapper>
  );
};

export default TodosList;
