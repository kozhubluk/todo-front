import './TodoForm.scss';
import dayjs from 'dayjs';
import { ReactComponent as CalendarIcon } from '../../assets/svg/calendar.svg';
import { ReactComponent as ListIcon } from '../../assets/svg/list.svg';
import { ReactComponent as FlagIcon } from '../../assets/svg/flag.svg';
import { useRef, useState } from 'react';
import Calendar from '../Calendar/Calendar';
import ModalWrapper from '../Modal/ModalWrapper';
import { Dropdown } from '../Dropdown/Dropdown';

const TodoForm = () => {
  const [value, setValue] = useState(dayjs('2022-04-17'));
  const [modals, setModals] = useState({
    calendar: false,
    list: false,
    prioroty: false,
  });

  const getModalHanlder = (modalName) => {
    return {
      isOpen: modals[modalName],
      open: () => setModals((state) => ({ ...state, [modalName]: true })),
      close: () => setModals((state) => ({ ...state, [modalName]: false })),
      toggle: () => setModals((state) => ({ ...state, [modalName]: !state[modalName] })),
    };
  };

  const calendarButton = useRef(null);

  const calendarDropdown = getModalHanlder('calendar');
  const listModal = getModalHanlder('list');

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
        <button>
          <FlagIcon />
        </button>
      </div>
      <label>Описание</label>

      <lable></lable>
      <ModalWrapper active={listModal.isOpen} closeModal={listModal.close}>
        segdfgfdg dfg dfgdf
      </ModalWrapper>
    </div>
  );
};

export default TodoForm;
