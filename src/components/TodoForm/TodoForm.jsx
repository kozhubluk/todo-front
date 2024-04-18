import './TodoForm.scss';
import dayjs from 'dayjs';
import { ReactComponent as CalendarIcon } from '../../assets/svg/calendar.svg';
import { ReactComponent as ListIcon } from '../../assets/svg/list.svg';
import { ReactComponent as FlagIcon } from '../../assets/svg/flag.svg';
import { useRef, useState } from 'react';
import Calendar from '../Calendar/Calendar';
import { Dropdown } from '../Dropdown/Dropdown';
import PriorityDropdown from '../PriorityDropdown/PriorityDropdown';
import ListModal from '../ListModal/ListModal';
import SubtaskItem, { NewSubtaskButton, NewSubtaskItem } from '../SubtaskItem/SubtaskItem';

const TodoForm = ({ priority, title, notes }) => {
  const [value, setValue] = useState(dayjs());
  const [modals, setModals] = useState({
    calendar: false,
    list: false,
    prioroty: false,
  });

  const subtaskInput = useRef(null);

  const getModalHanlder = (modalName) => {
    return {
      isOpen: modals[modalName],
      open: () => setModals((state) => ({ ...state, [modalName]: true })),
      close: () => setModals((state) => ({ ...state, [modalName]: false })),
      toggle: () => setModals((state) => ({ ...state, [modalName]: !state[modalName] })),
    };
  };

  const calendarButton = useRef(null);
  const priorityButton = useRef(null);

  const calendarDropdown = getModalHanlder('calendar');
  const listModal = getModalHanlder('list');
  const priorityDropdown = getModalHanlder('prioroty');

  return (
    <div className="todo-form">
      <input type="text" className="todo-form__title" value="вынести мусор" />
      <div className="todo-form__buttons">
        <div className="todo-form__button-container">
          <button ref={calendarButton} onClick={calendarDropdown.toggle}>
            <CalendarIcon /> Дедлайн
          </button>
          <Dropdown
            button={calendarButton}
            closeDropdown={calendarDropdown.close}
            active={calendarDropdown.isOpen}>
            <Calendar value={value} />
          </Dropdown>
        </div>

        <button onClick={listModal.open}>
          <ListIcon />
          ОСТ
        </button>
        <div className="todo-form__button-container">
          <button ref={priorityButton} onClick={priorityDropdown.toggle}>
            <FlagIcon className="high" /> Приоритет
          </button>
          <PriorityDropdown
            button={priorityButton}
            closeDropdown={priorityDropdown.close}
            active={priorityDropdown.isOpen}
          />
        </div>
      </div>
      <div>
        <label for="notes" className="todo-form__label">
          Описание
        </label>
        <textarea name="notes" className="todo-form__input"></textarea>
      </div>
      <div className="todo-form__subtasks">
        <SubtaskItem title={'sleeep'} isDone={true} />
        <SubtaskItem isDone={false} />
        <SubtaskItem isDone={false} />
        <NewSubtaskItem
          visibility={document.activeElement === subtaskInput.current}
          inputRef={subtaskInput}
        />
        <NewSubtaskButton
          onClick={() => {
            subtaskInput.current.focus();
            console.log(subtaskInput);
          }}
        />
      </div>
      <ListModal active={listModal.isOpen} closeModal={listModal.close} />
    </div>
  );
};

export default TodoForm;
