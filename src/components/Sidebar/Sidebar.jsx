import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import { ReactComponent as SettingIcon } from '../../assets/svg/gear.svg';
import { ReactComponent as TodayIcon } from '../../assets/svg/today.svg';
import { ReactComponent as WeekIcon } from '../../assets/svg/week.svg';
import { ReactComponent as TasksIcon } from '../../assets/svg/tasks.svg';
import { ReactComponent as MoreIcon } from '../../assets/svg/more.svg';
import { ReactComponent as DeleteIcon } from '../../assets/svg/delete.svg';
import { ReactComponent as EditIcon } from '../../assets/svg/edit.svg';
import { useRef, useState } from 'react';
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__user-info">
          <div className="sidebar__setting">
            <SettingIcon />
          </div>
          <div className="sidebar__username">Avdeeva Anast...</div>
        </div>
        <div className="sidebar__add">
          <div className="sidebar__add-icon">+</div>
          <div className="sidebar__add-text"> Добавить задачу</div>
        </div>
        <ul className="sidebar__menu">
          <MenuItem to="/" icon={<TodayIcon />} title="Сегодня" />
          <MenuItem to="/week" icon={<WeekIcon />} title="Следующие 7 дней" />
          <MenuItem to="/all" icon={<TasksIcon />} title="Все задачи" />
          <li className="sidebar__header">
            <div className="sidebar__header-title">Мои списки</div>
            <button className="sidebar__add-button">+</button>
          </li>
          <ListItem id={1} title={'Важное!!'} />
          <ListItem id={2} title={'ОСТ'} />
          <ListItem id={3} title={'Учеба'} />
        </ul>
      </div>
    </div>
  );
};

const MenuItem = ({ to, icon, title }) => {
  return (
    <li className="sidebar__item">
      <NavLink
        className={({ isActive }) =>
          isActive ? 'sidebar__item-link active' : 'sidebar__item-link'
        }
        to={to}>
        <div className="sidebar__item-icon">{icon}</div>
        <div className="sidebar__item-title">{title}</div>
      </NavLink>
    </li>
  );
};

const ListItem = ({ id, title }) => {
  const [active, setActive] = useState(false);
  const buttonRef = useRef();

  return (
    <li className="sidebar__item">
      <NavLink
        to={`tasks/${id}`}
        className={({ isActive }) =>
          isActive ? 'sidebar__item-link active' : 'sidebar__item-link'
        }>
        <div className="sidebar__item-title">{title}</div>
        <div className="more">
          <div className="more-icon">
            <MoreIcon
              ref={buttonRef}
              onClick={(e) => {
                e.preventDefault();
                setActive((prev) => !prev);
              }}
            />
          </div>
        </div>
      </NavLink>
      <Dropdown active={active} setActive={setActive} button={buttonRef}>
        <DropdownItem iconLeft={<EditIcon />}>Изменить</DropdownItem>
        <DropdownItem iconLeft={<DeleteIcon />}>Удалить</DropdownItem>
      </Dropdown>
    </li>
  );
};

export default Sidebar;
