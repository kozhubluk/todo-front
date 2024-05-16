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
import { getModalHanlder } from '../../utils/getModalHanlder';
import { priorities } from '../../assets/priorities';
import { useGetListsQuery } from '../../redux/slices/listApiSlice';
import { ReactComponent as XmarkIcon } from '../../assets/svg/xmark.svg';
import SubtasksList from './SubtasksList';

const TodoForm = ({ updateTodo, data }) => {
  // списки пользователя
  const { data: lists, isLoading: listsIsLoading } = useGetListsQuery();

  // данные формы
  const [deadline, setDeadline] = useState(dayjs());
  const [priority, setPriority] = useState(0);
  const [list, setList] = useState({});
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setDeadline(dayjs(data?.deadline));
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

  return (
    <div className="todo-form">
      <input
        maxLength="240"
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
            <CalendarIcon /> <div className="button-text">{deadline.format('DD.MM.YYYY')}</div>
          </button>
          <Dropdown
            active={calendarDropdown.isOpen}
            button={calendarButton}
            closeDropdown={calendarDropdown.close}>
            <Calendar value={deadline} setValue={setDeadline} />
          </Dropdown>
        </div>
        <button className="list-button" onClick={listModal.open}>
          <ListIcon />

          {list.id && list.id !== -1 && !listsIsLoading ? (
            <>
              <div className="button-text">
                {lists.find((listItem) => list.id === listItem.id)?.title}
              </div>
              <XmarkIcon
                className="xmark"
                onClick={(e) => {
                  e.stopPropagation();
                  setList({ id: -1 });
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
            <p>{priorities[priority].title}</p>
          </button>
          <PriorityDropdown
            active={priorityDropdown.isOpen}
            button={priorityButton}
            setPriority={setPriority}
            closeDropdown={priorityDropdown.close}
          />
        </div>
      </div>
      <div>
        <label htmlFor="notes" className="todo-form__label">
          Описание
        </label>
        <textarea
          className="todo-form__input"
          maxLength="240"
          name="notes"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}></textarea>
      </div>
      <SubtasksList todoId={data?.id} />
      <div className="todo-form__button-wrapper">
        <button
          onClick={() => {
            updateTodo({
              title,
              notes,
              deadline: deadline.format('YYYY-MM-DD'),
              priority,
              folderId: list.id,
            });
          }}
          disabled={!title.trim()}>
          Сохранить
        </button>
      </div>

      <ListModal
        active={listModal.isOpen}
        listId={list.id}
        data={lists}
        closeModal={listModal.close}
        setList={setList}
      />
    </div>
  );
};

export default TodoForm;
