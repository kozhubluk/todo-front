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
import ModalWrapper from '../Modal/ModalWrapper';
import AddListModal from '../AddListModal/AddListModal';
import { getModalHanlder } from '../../utils/getModalHanlder';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

const Sidebar = () => {
  const [modals, setModals] = useState({
    profile: false,
    addList: false,
    editList: false,
    confirm: false,
  });

  const editListModal = getModalHanlder(modals, 'editList', setModals);
  const addListModal = getModalHanlder(modals, 'addList', setModals);
  const confirmModal = getModalHanlder(modals, 'confirm', setModals);

  const [currentList, setCurrentList] = useState({});

  const listItemHandler = (list) => {
    setCurrentList(list);
    editListModal.open();
  };

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
          <MenuItem to="/" icon={<TodayIcon />} title="Сегодня" />
          <MenuItem to="/week" icon={<WeekIcon />} title="Следующие 7 дней" />
          <MenuItem to="/all" icon={<TasksIcon />} title="Все задачи" />
          <li className="sidebar__header">
            <div className="sidebar__header-title">Мои списки</div>
            <button className="sidebar__add-button" onClick={addListModal.open}>
              +
            </button>
          </li>
          <ListItem
            editHandler={listItemHandler}
            deleteHandler={confirmModal.open}
            id={1}
            title={'Важное!!'}
          />
          <ListItem
            editHandler={listItemHandler}
            deleteHandler={confirmModal.open}
            id={2}
            title={'ОСТ'}
          />
        </ul>
      </div>
      <AddListModal
        data={currentList}
        cancelHandler={editListModal.close}
        active={editListModal.isOpen}
        closeModal={editListModal.close}
      />
      <AddListModal
        cancelHandler={addListModal.close}
        active={addListModal.isOpen}
        closeModal={addListModal.close}
      />
      <ConfirmModal active={confirmModal.isOpen} closeModal={confirmModal.close}>
        Вы уврены, что хотите удалить этот список? Задачи, принадлежащие списку, будут так же
        удалены.
      </ConfirmModal>
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

const ListItem = ({ id, title, editHandler, deleteHandler }) => {
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
      <Dropdown
        active={active}
        position="right"
        closeDropdown={() => {
          setActive((prev) => false);
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

export default Sidebar;
