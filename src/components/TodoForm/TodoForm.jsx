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
import { getModalHanlder } from '../../utils/getModalHanlder';

const TodoForm = ({ priority, title, notes }) => {
  const [value, setValue] = useState(dayjs());
  const [modals, setModals] = useState({
    calendar: false,
    list: false,
    prioroty: false,
  });

  const subtaskInput = useRef(null);

  const calendarButton = useRef(null);
  const priorityButton = useRef(null);

  const calendarDropdown = getModalHanlder(modals, 'calendar', setModals);
  const listModal = getModalHanlder(modals, 'list', setModals);
  const priorityDropdown = getModalHanlder(modals, 'prioroty', setModals);

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
        <label htmlFor="notes" className="todo-form__label">
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
