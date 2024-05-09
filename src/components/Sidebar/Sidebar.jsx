import './Sidebar.scss';
import { ReactComponent as SettingIcon } from '../../assets/svg/gear.svg';
import { ReactComponent as TodayIcon } from '../../assets/svg/today.svg';
import { ReactComponent as WeekIcon } from '../../assets/svg/week.svg';
import { ReactComponent as TasksIcon } from '../../assets/svg/tasks.svg';
import MenuItem from './MenuItem';
import ListMenu from './ListMenu';

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
        <ul className="sidebar__menu">
          <MenuItem to="/today" icon={<TodayIcon />} title="Сегодня" />
          <MenuItem to="/week" icon={<WeekIcon />} title="Следующие 7 дней" />
          <MenuItem to="/all" icon={<TasksIcon />} title="Выполненные" />
          <ListMenu />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
