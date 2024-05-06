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

const SearchLine = () => {
  const [value, setValue] = useState(dayjs());
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
    <>
      <div className="search-line">
        <input placeholder="Название задачи" className="search-line__title-input"></input>
        <input placeholder="Описание" className="search-line__notes-input"></input>
        <div className="search-line__buttons">
          <div className="search-line__button-container">
            <button
              ref={calendarButton}
              onClick={calendarDropdown.toggle}
              className="deadline-button">
              <CalendarIcon /> Дедлайн
            </button>
            <Dropdown
              button={calendarButton}
              closeDropdown={calendarDropdown.close}
              active={calendarDropdown.isOpen}>
              <Calendar value={value} />
            </Dropdown>
          </div>
          <div className="search-line__button-container">
            <button
              ref={priorityButton}
              className="priority-button"
              onClick={priorityDropdown.toggle}>
              <FlagIcon className="medium" /> Приоритет
            </button>
            <PriorityDropdown
              button={priorityButton}
              closeDropdown={priorityDropdown.close}
              active={priorityDropdown.isOpen}
            />
          </div>
          <button className="priority-button" onClick={listModal.open}>
            <ListIcon /> Список
          </button>
        </div>
        <div className="search-line__bottom-panel">
          <button>Добавить задачу</button>
        </div>
      </div>
      <ListModal active={listModal.isOpen} closeModal={listModal.close} />
    </>
  );
};

export default SearchLine;
