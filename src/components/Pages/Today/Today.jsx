import { useState } from 'react';
import ModalWrapper from '../../Modal/ModalWrapper';
import TodoForm from '../../TodoForm/TodoForm';
import TodoItem from '../../TodoItem/TodoItem';
import './Today.scss';
import { getModalHanlder } from '../../../utils/getModalHanlder';
import ConfirmModal from '../../ConfirmModal/ConfirmModal';
import Wrapper from '../../Wrapper/Wrapper';
import TodoInput from '../../TodoInput/TodoInput';

const TodayPage = () => {
  const [modals, setModals] = useState({
    confirm: false,
    editTodo: false,
  });

  const [currentTodo, setCurrentTodo] = useState({});

  const confirmModal = getModalHanlder(modals, 'confirm', setModals);
  const editTodoModal = getModalHanlder(modals, 'editTodo', setModals);

  // const todoClickHandler = (todo) => {
  //   setCurrentTodo(todo);
  // };

  return (
    <Wrapper>
      <div className="today-container">
        <TodoInput />
        <h1>Сегодня</h1>
        <TodoItem
          actionHandler={editTodoModal.open}
          deleteHandler={confirmModal.open}
          title="Сделать отчет по 9й работе"
          list="ОСТ"
          priority={0}
          isDone={true}
        />
        <TodoItem title="Сделать отчет по 10й работе" list="ПИС" priority={0} isDone={false} />
        <TodoItem title="Поступить в ранхигс" list="карьера" priority={3} isDone={false} />
        <ModalWrapper active={editTodoModal.isOpen} closeModal={editTodoModal.close}>
          <TodoForm></TodoForm>
        </ModalWrapper>
        <ConfirmModal active={confirmModal.isOpen} closeModal={confirmModal.close}>
          Вы уверены, что хотите удалить задачу?
        </ConfirmModal>
      </div>
    </Wrapper>
  );
};

export default TodayPage;
