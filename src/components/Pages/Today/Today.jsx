import { useState } from 'react';
import ModalWrapper from '../../Modal/ModalWrapper';
import TodoForm from '../../TodoForm/TodoForm';
import TodoItem from '../../TodoItem/TodoItem';
import './Today.scss';
import { getModalHanlder } from '../../../utils/getModalHanlder';
import ConfirmModal from '../../ConfirmModal/ConfirmModal';
import Wrapper from '../../Wrapper/Wrapper';
import TodoInput from '../../TodoInput/TodoInput';
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from '../../../redux/slices/todoApiSlice';
import { useGetListsQuery, useUpdateListMutation } from '../../../redux/slices/listApiSlice';

const TodayPage = () => {
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
  const { data, isLoading } = useGetTodosQuery();
  const [addTodo, { isLoading: addIsLoading }] = useAddTodoMutation();
  const [updateTodo, { isLoading: updateIsLoading }] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: deleteIsLoading }] = useDeleteTodoMutation();

  // списк
  const { data: lists, isLoading: listsIsLoading } = useGetListsQuery();

  return (
    <Wrapper>
      <div className="today-container">
        <TodoInput />
        <h1>Сегодня</h1>
        {!isLoading &&
          data.map((item) => (
            <TodoItem
              toggleHandler={() => {
                updateTodo({ id: item.id, body: { completed: !item.completed } });
              }}
              title={item.title}
              list={item.folderId ? lists.find((list) => item.folderId === list.id)?.title : null}
              priority={item.priority}
              updateIsLoading={updateIsLoading}
              actionHandler={() => {
                setCurrentTodo(item);
                editTodoModal.open();
              }}
              isDone={item.completed}
              deleteHandler={() => {
                setCurrentTodo(item);
                confirmModal.open();
              }}
            />
          ))}
        <ModalWrapper active={editTodoModal.isOpen} closeModal={editTodoModal.close}>
          <TodoForm></TodoForm>
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

export default TodayPage;
