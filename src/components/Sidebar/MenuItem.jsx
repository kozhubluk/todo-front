import { NavLink } from 'react-router-dom';

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

export default MenuItem;
