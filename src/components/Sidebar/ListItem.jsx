import { ReactComponent as MoreIcon } from '../../assets/svg/more.svg';
import { ReactComponent as DeleteIcon } from '../../assets/svg/delete.svg';
import { ReactComponent as EditIcon } from '../../assets/svg/edit.svg';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown';

const ListItem = ({ data: { id, title }, editHandler, deleteHandler }) => {
  const [active, setActive] = useState(false);
  const buttonRef = useRef();

  return (
    <li className="sidebar__item">
      <NavLink
        to={`/lists/${id}`}
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

      <Dropdown
        active={active}
        position="right"
        closeDropdown={() => {
          setActive(false);
        }}
        button={buttonRef}>
        <DropdownItem
          actionHandler={() => {
            editHandler({ id, title });
            setActive(false);
          }}
          iconLeft={<EditIcon />}>
          Изменить
        </DropdownItem>
        <DropdownItem
          actionHandler={() => {
            deleteHandler();
            setActive(false);
          }}
          iconLeft={<DeleteIcon />}>
          Удалить
        </DropdownItem>
      </Dropdown>
    </li>
  );
};

export default ListItem;
