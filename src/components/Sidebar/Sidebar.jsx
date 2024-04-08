import './Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <div className="sidebar__user-avatar"></div>
        <div className="sidebar__username">Avdeeva Anastasia</div>
      </div>
      <ul className="sidebar__menu">
        <li className="sidebar__menu-item">
          <div className="sidebar__menu-item-icon"></div>
          <div className="sidebar__menu-item-title">Сегодня</div>
        </li>
        <li className="sidebar__menu-item">
          <div className="sidebar__menu-item-icon"></div>
          <div className="sidebar__menu-item-title">Следующие 7 дней</div>
        </li>
        <li className="sidebar__menu-item">
          <div className="sidebar__menu-item-icon"></div>
          <div className="sidebar__menu-item-title">Все задачи</div>
        </li>
        <li className="sidebar__menu-header">
          <div className="sidebar__menu-header-title">Мои списки</div>
          <button>+</button>
        </li>
        <li className="sidebar__menu-item">
          <div className="sidebar__menu-item-icon"></div>
          <div className="sidebar__menu-item-title">Важное бумажное</div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
