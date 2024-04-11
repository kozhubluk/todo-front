import { useEffect, useRef } from 'react';
import './Dropdown.scss';

export const Dropdown = ({ active, setActive, children, button }) => {
  const dropdownRef = useRef();

  useEffect(() => {
    const onClick = (e) => {
      if (active && !button.current.contains(e.target) && !dropdownRef.current.contains(e.target)) {
        setActive(false);
      }
    };

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [active, button, setActive]);

  return (
    <div ref={dropdownRef} className={active ? 'dropdown active' : 'dropdown'}>
      <ul className="dropdown__menu">{children}</ul>
    </div>
  );
};

export const DropdownItem = ({ children, iconLeft, iconRight }) => {
  return (
    <li className="dropdown__item">
      <div className="dropdown__item-left-icon">{iconLeft}</div>
      <div className="dropdown__item-title">{children}</div>
      <div className="dropdown__item-right-icon">{iconRight}</div>
    </li>
  );
};
