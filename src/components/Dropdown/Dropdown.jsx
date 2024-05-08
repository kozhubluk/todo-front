import { useEffect, useRef } from 'react';
import './Dropdown.scss';

export const Dropdown = ({ active, closeDropdown, children, button, position = 'down' }) => {
  const dropdownRef = useRef();

  useEffect(() => {
    const onClick = (e) => {
      if (active && !button.current.contains(e.target)) {
        closeDropdown();
      }
    };

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [active, button, closeDropdown]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={dropdownRef}
      className={`dropdown dropdown--${position} ${active ? 'dropdown--active' : ''}`}>
      <ul className="dropdown__menu">{children}</ul>
    </div>
  );
};

export const DropdownItem = ({ key, children, iconLeft, iconRight, actionHandler }) => {
  return (
    <li key={key} onClick={actionHandler} className="dropdown__item">
      <div className="dropdown__item-left-icon">{iconLeft}</div>
      <div className="dropdown__item-title">{children}</div>
      <div className="dropdown__item-right-icon">{iconRight}</div>
    </li>
  );
};
