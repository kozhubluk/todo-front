import './Sidebar.scss';
import { ReactComponent as SettingIcon } from '../../assets/svg/gear.svg';
import { ReactComponent as EditIcon } from '../../assets/svg/edit.svg';
import { ReactComponent as TodayIcon } from '../../assets/svg/today.svg';
import { ReactComponent as WeekIcon } from '../../assets/svg/week.svg';
import { ReactComponent as TasksIcon } from '../../assets/svg/tasks.svg';
import { ReactComponent as LogoutIcon } from '../../assets/svg/logout.svg';
import MenuItem from './MenuItem';
import ListMenu from './ListMenu';
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown';
import { logout } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { getModalHanlder } from '../../utils/getModalHanlder';
import EditModal from '../AddListModal/EditModal';
import { useGetUserQuery, useUpdateUserMutation } from '../../redux/slices/userApiSlice';
import { Skeleton } from '@mui/material';

const Sidebar = () => {
  const [modals, setModals] = useState({
    userDropdown: false,
    userModal: false,
  });

  const dropdownButton = useRef(null);

  const userDropdown = getModalHanlder(modals, 'userDropdown', setModals);
  const userModal = getModalHanlder(modals, 'userModal', setModals);

  const dispatch = useDispatch();

  const { data, isLoading } = useGetUserQuery();
  const [updateUser, { isLoading: updateIsLoading }] = useUpdateUserMutation();

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div
          onClick={(e) => {
            userDropdown.toggle();
          }}
          className="sidebar__user-info">
          <div ref={dropdownButton} className="sidebar__setting">
            <SettingIcon />
          </div>
          <div className="sidebar__username">
            {!isLoading ? (
              <p> {data?.name}</p>
            ) : (
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'grey.900', borderRadius: '4px', width: '90px' }}></Skeleton>
            )}
            <Dropdown
              button={dropdownButton}
              closeDropdown={userDropdown.close}
              active={userDropdown.isOpen}>
              <DropdownItem
                actionHandler={() => {
                  userDropdown.close();
                  userModal.open();
                }}
                iconLeft={<EditIcon />}>
                Изменить
              </DropdownItem>
              <DropdownItem
                iconLeft={<LogoutIcon />}
                actionHandler={() => {
                  dispatch(logout());
                }}>
                Выйти
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
        <ul className="sidebar__menu">
          <MenuItem to="/today" icon={<TodayIcon />} title="Сегодня" />
          <MenuItem to="/week" icon={<WeekIcon />} title="Входящие" />
          <MenuItem to="/all" icon={<TasksIcon />} title="Выполненное" />
          <ListMenu />
        </ul>
      </div>
      <EditModal
        modalName={'Имя пользователя'}
        data={data?.name}
        cancelHandler={userModal.close}
        active={userModal.isOpen}
        isLoading={updateIsLoading}
        closeModal={userModal.close}
        saveHandler={async (name) => {
          await updateUser({ name });
          userModal.close();
        }}
      />
    </div>
  );
};

export default Sidebar;
