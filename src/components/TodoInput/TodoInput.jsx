import './TodoInput.scss';
import { ReactComponent as CalendarIcon } from '../../assets/svg/calendar.svg';
import { ReactComponent as FlagIcon } from '../../assets/svg/flag.svg';
import { ReactComponent as ListIcon } from '../../assets/svg/list.svg';
import { useRef, useState } from 'react';
import { getModalHanlder } from '../../utils/getModalHanlder';
import PriorityDropdown from '../PriorityDropdown/PriorityDropdown';
import { Dropdown } from '../Dropdown/Dropdown';
import Calendar from '../Calendar/Calendar';
import dayjs from 'dayjs';
import ListModal from '../ListModal/ListModal';
import { priorities } from '../../assets/priorities';
import { ReactComponent as XmarkIcon } from '../../assets/svg/xmark.svg';
import { useGetListsQuery } from '../../redux/slices/listApiSlice';
import { useAddTodoMutation } from '../../redux/slices/todoApiSlice';

const TodoInput = ({ defaultDate = dayjs(), setSnackbar }) => {
  // данные формы
  const [date, setDate] = useState(defaultDate);
  const [priority, setPriority] = useState(0);
  const [list, setList] = useState({});
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

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

  const { data: lists } = useGetListsQuery();
  const [addTodo] = useAddTodoMutation();

  return (
    <>
      <div className="todo_input">
        <input
          maxLength="240"
          placeholder="Название задачи"
          className="todo_input__title-input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          maxLength="240"
          placeholder="Описание"
          className="todo_input__notes-input"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}
        />
        <div className="todo_input__buttons">
          <div className="todo_input__button-container">
            <button
              ref={calendarButton}
              onClick={calendarDropdown.toggle}
              className="deadline-button">
              <CalendarIcon /> <div className="button-text">{date.format(`DD.MM.YYYY`)}</div>
            </button>
            <Dropdown
              button={calendarButton}
              closeDropdown={calendarDropdown.close}
              active={calendarDropdown.isOpen}>
              <Calendar value={date} setValue={setDate} />
            </Dropdown>
          </div>
          <div className="todo_input__button-container">
            <button
              ref={priorityButton}
              className="priority-button"
              onClick={priorityDropdown.toggle}>
              <FlagIcon className={priorities[priority].className} />
              <div className="button-text"> {priorities[priority].title}</div>
            </button>
            <PriorityDropdown
              button={priorityButton}
              closeDropdown={priorityDropdown.close}
              active={priorityDropdown.isOpen}
              priority={priority}
              setPriority={setPriority}
            />
          </div>
          <button className="priority-button" onClick={listModal.open}>
            <ListIcon />
            {list.id ? (
              <>
                <div className="button-text"> {list.title}</div>
                <XmarkIcon
                  className="xmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    setList({});
                  }}
                />
              </>
            ) : (
              'Список'
            )}
          </button>
        </div>
        <div className="todo_input__bottom-panel">
          <button
            disabled={!title.trim()}
            onClick={() => {
              addTodo({
                title,
                notes,
                priority,
                deadline: date.format('YYYY-MM-DD'),
                folderId: list.id,
                completed: false,
              })
                .unwrap()
                .then(() => {
                  setSnackbar('Добавлена новая задача');
                })
                .catch((error) => {
                  setSnackbar(error.data);
                });
              setTitle('');
              setNotes('');
            }}>
            Добавить задачу
          </button>
        </div>
      </div>
      <ListModal
        data={lists}
        listId={list.id}
        setList={setList}
        active={listModal.isOpen}
        closeModal={listModal.close}
      />
    </>
  );
};

export default TodoInput;
