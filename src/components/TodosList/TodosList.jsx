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
import { Skeleton } from '@mui/material';
import { groupByDeadline } from '../../utils/groupTodos';

const TodosList = ({ params = {}, id = 0, showForm = true }) => {
  // Модальные окна
  const [modals, setModals] = useState({
    confirm: false,
    editTodo: false,
  });

  const confirmModal = getModalHanlder(modals, 'confirm', setModals);
  const editTodoModal = getModalHanlder(modals, 'editTodo', setModals);

  // Текст для модального окна
  const confirmModalText = 'Вы уверены, что хотите удалить задачу?';

  // todo с которым производятся действия
  const [currentTodo, setCurrentTodo] = useState(null);

  // методы работы с todos
  const { data, isLoading } = useGetTodosQuery(params);
  const [updateTodo, { isLoading: updateIsLoading }] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: deleteIsLoading }] = useDeleteTodoMutation();

  // списки
  const { data: lists, isLoading: listsIsLoading } = useGetListsQuery();

  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    if (data) {
      setGroupedData(groupByDeadline(data));
    }
  }, [data]);

  return (
    <Wrapper>
      <div className="today-container">
        {showForm && <TodoInput />}

        {!isLoading ? (
          Object.keys(groupedData).map((key) => (
            <>
              {groupedData[key].items.length > 0 && <h2>{groupedData[key].date}</h2>}
              {groupedData[key].items.map((item) => (
                <TodoItem
                  key={item.id}
                  data={item}
                  list={
                    item.folderId && !listsIsLoading
                      ? lists.find((list) => item.folderId === list.id)?.title
                      : null
                  }
                  toggleHandler={() => {
                    updateTodo({ id: item.id, body: { completed: !item.completed } });
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
            </>
          ))
        ) : (
          <>
            <Skeleton variant="rectangular" sx={{ bgcolor: 'grey.900', borderRadius: '10px' }}>
              <h2>Загрузка данных</h2>
            </Skeleton>
            {[...Array(5)].map(() => (
              <Skeleton variant="rectangular" className="todo-item" sx={{ bgcolor: 'grey.900' }} />
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
            updateTodo={(body) => {
              updateTodo({ id: currentTodo.id, body });
              editTodoModal.close();
            }}></TodoForm>
        </ModalWrapper>
        <ConfirmModal
          active={confirmModal.isOpen}
          closeModal={confirmModal.close}
          confirmHandler={async () => {
            await deleteTodo(currentTodo.id);
            confirmModal.close();
          }}
          isLoading={deleteIsLoading}
          cancelHandler={confirmModal.close}>
          {confirmModalText}
        </ConfirmModal>
      </div>
    </Wrapper>
  );
};

export default TodosList;
