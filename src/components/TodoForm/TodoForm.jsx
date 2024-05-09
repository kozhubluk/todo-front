import './TodoForm.scss';
import dayjs from 'dayjs';
import { ReactComponent as CalendarIcon } from '../../assets/svg/calendar.svg';
import { ReactComponent as ListIcon } from '../../assets/svg/list.svg';
import { ReactComponent as FlagIcon } from '../../assets/svg/flag.svg';
import { useEffect, useRef, useState } from 'react';
import Calendar from '../Calendar/Calendar';
import { Dropdown } from '../Dropdown/Dropdown';
import PriorityDropdown from '../PriorityDropdown/PriorityDropdown';
import ListModal from '../ListModal/ListModal';
import SubtaskItem, { NewSubtaskButton, NewSubtaskItem } from '../SubtaskItem/SubtaskItem';
import { getModalHanlder } from '../../utils/getModalHanlder';
import { priorities } from '../../assets/priorities';
import { useGetListsQuery } from '../../redux/slices/listApiSlice';
import { ReactComponent as XmarkIcon } from '../../assets/svg/xmark.svg';
import {
  useAddSubtaskMutation,
  useDeleteSubtaskMutation,
  useGetSubtasksQuery,
  useUpdateSubtaskMutation,
} from '../../redux/slices/subtaskApiSlice';
import { useGetTodoQuery, useUpdateTodoMutation } from '../../redux/slices/todoApiSlice';

const TodoForm = ({ updateTodo, data }) => {
  // списки
  const { data: lists, isLoading: listsIsLoading } = useGetListsQuery();

  // подзадачи
  const { data: subtasks, isLoading: subtasksIsLoading } = useGetSubtasksQuery(data?.id || 0);
  const [addSubtask] = useAddSubtaskMutation();
  const [updateSubtask] = useUpdateSubtaskMutation();
  const [deleteSubtask] = useDeleteSubtaskMutation();

  // данные формы
  const [date, setDate] = useState(dayjs());
  const [priority, setPriority] = useState(0);
  const [list, setList] = useState({});
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setDate(dayjs(data?.deadline));
    setPriority(data?.priority || 0);
    setTitle(data?.title || '');
    setNotes(data?.notes || '');
    setList({ id: data?.folderId });
  }, [data]);

  // модальные окна
  const [modals, setModals] = useState({
    calendar: false,
    list: false,
    prioroty: false,
  });

  const calendarButton = useRef(null);
  const priorityButton = useRef(null);

  const calendarDropdown = getModalHanlder(modals, 'calendar', setModals);
  const listModal = getModalHanlder(modals, 'list', setModals);
  const priorityDropdown = getModalHanlder(modals, 'prioroty', setModals);

  // Ввод для подзадач
  const subtaskInput = useRef(null);

  return (
    <div className="todo-form">
      <input
        type="text"
        className="todo-form__title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <div className="todo-form__buttons">
        <div className="todo-form__button-container">
          <button
            className="deadline-button"
            ref={calendarButton}
            onClick={calendarDropdown.toggle}>
            <CalendarIcon /> {date.format('DD.MM')}
          </button>
          <Dropdown
            button={calendarButton}
            closeDropdown={calendarDropdown.close}
            active={calendarDropdown.isOpen}>
            <Calendar value={date} setValue={setDate} />
          </Dropdown>
        </div>

        <button className="list-button" onClick={listModal.open}>
          <ListIcon />
          {list.id && !listsIsLoading ? (
            <>
              {lists.find((listItem) => list.id === listItem.id)?.title}{' '}
              <XmarkIcon
                className="xmark"
                onClick={(e) => {
                  e.stopPropagation();
                  setList({});
                }}
              />
            </>
          ) : (
            'Списки'
          )}
        </button>
        <div className="todo-form__button-container">
          <button
            className="priority-button"
            ref={priorityButton}
            onClick={priorityDropdown.toggle}>
            <FlagIcon className={priorities[priority].className} />
            {priorities[priority].title}
          </button>
          <PriorityDropdown
            setPriority={setPriority}
            button={priorityButton}
            closeDropdown={priorityDropdown.close}
            active={priorityDropdown.isOpen}
          />
        </div>
      </div>
      <div>
        <label htmlFor="notes" className="todo-form__label">
          Описание
        </label>
        <textarea
          name="notes"
          className="todo-form__input"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}></textarea>
      </div>

      <div className="todo-form__subtasks">
        {!subtasksIsLoading &&
          subtasks.map((subtask) => (
            <SubtaskItem
              key={subtask.id}
              deleteHandler={() => {
                deleteSubtask(subtask.id);
              }}
              toggleHandler={() => {
                updateSubtask({ id: subtask.id, body: { completed: !subtask.completed } });
              }}
              data={subtask}
              onBlurHandler={(text) => {
                updateSubtask({ id: subtask.id, body: { title: text } });
              }}
            />
          ))}

        <NewSubtaskItem
          onBlurHandler={(text) => {
            addSubtask({ todoId: data.id, body: { title: text, completed: false } });
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
      <div className="todo-form__button-wrapper">
        <button
          onClick={() => {
            updateTodo({ title, notes, deadline: date, priority, folderId: list.id });
          }}>
          Сохранить
        </button>
      </div>

      <ListModal
        data={lists}
        listId={list.id}
        active={listModal.isOpen}
        closeModal={listModal.close}
        setList={setList}
      />
    </div>
  );
};

export default TodoForm;
