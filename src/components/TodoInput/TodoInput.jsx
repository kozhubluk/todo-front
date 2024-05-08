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

const SearchLine = ({ AddTaskHandler }) => {
  // данные формы
  const [date, setDate] = useState(dayjs());
  const [priority, setPriority] = useState(0);
  const [list, setList] = useState({});
  const [title, setTitle] = useState('sdf');
  const [notes, setNotes] = useState('sdf');

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
      <div className="search-line">
        <input
          placeholder="Название задачи"
          className="search-line__title-input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          placeholder="Описание"
          className="search-line__notes-input"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}
        />
        <div className="search-line__buttons">
          <div className="search-line__button-container">
            <button
              ref={calendarButton}
              onClick={calendarDropdown.toggle}
              className="deadline-button">
              <CalendarIcon /> {date.format(`DD.MM`)}
            </button>
            <Dropdown
              button={calendarButton}
              closeDropdown={calendarDropdown.close}
              active={calendarDropdown.isOpen}>
              <Calendar value={date} setValue={setDate} />
            </Dropdown>
          </div>
          <div className="search-line__button-container">
            <button
              ref={priorityButton}
              className="priority-button"
              onClick={priorityDropdown.toggle}>
              <FlagIcon className={priorities[priority].className} /> {priorities[priority].title}
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
                {list.title}
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
        <div className="search-line__bottom-panel">
          <button
            onClick={() => {
              if (title.trim()) {
                addTodo({
                  title: title,
                  notes,
                  priority,
                  deadline: date,
                  folderId: list.id,
                  completed: false,
                });
                setTitle('');
                setNotes('');
                setPriority(0);
                setDate(dayjs());
                setList({});
              }
            }}>
            Добавить задачу
          </button>
        </div>
      </div>
      <ListModal
        data={lists}
        list={list}
        setList={setList}
        active={listModal.isOpen}
        closeModal={listModal.close}
      />
    </>
  );
};

export default SearchLine;
