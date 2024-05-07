import './Sidebar.scss';
import { ReactComponent as SettingIcon } from '../../assets/svg/gear.svg';
import { ReactComponent as TodayIcon } from '../../assets/svg/today.svg';
import { ReactComponent as WeekIcon } from '../../assets/svg/week.svg';
import { ReactComponent as TasksIcon } from '../../assets/svg/tasks.svg';

import { useState } from 'react';
import AddListModal from '../AddListModal/AddListModal';
import { getModalHanlder } from '../../utils/getModalHanlder';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import {
  useAddListMutation,
  useDeleteListMutation,
  useGetListsQuery,
  useUpdateListMutation,
} from '../../redux/slices/listApiSlice';
import MenuItem from './MenuItem';
import ListItem from './ListItem';

const Sidebar = () => {
  // модальные окна и дропдауны

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

  // списки
  const [addList, { isLoading, isError }] = useAddListMutation();
  const [deleteList] = useDeleteListMutation();
  const [updateList] = useUpdateListMutation();
  const { data: lists, isLoading: listsIsLoading } = useGetListsQuery();
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
          <MenuItem to="/all" icon={<TasksIcon />} title="Все задачи" />
          <li className="sidebar__header">
            <div className="sidebar__header-title">Мои списки</div>
            <button className="sidebar__add-button" onClick={addListModal.open}>
              +
            </button>
          </li>
          {!listsIsLoading &&
            lists.map((list) => (
              <ListItem
                editHandler={listItemHandler}
                deleteHandler={() => {
                  setCurrentList(list);
                  confirmModal.open();
                }}
                id={list.id}
                title={list.title}
              />
            ))}
        </ul>
      </div>
      <AddListModal
        saveHandler={async (body) => {
          updateList({ id: currentList.id, body }).unwrap();
          editListModal.close();
        }}
        data={currentList}
        cancelHandler={editListModal.close}
        active={editListModal.isOpen}
        closeModal={editListModal.close}
      />
      <AddListModal
        saveHandler={async (body) => {
          addList(body).unwrap();
          addListModal.close();
        }}
        cancelHandler={addListModal.close}
        active={addListModal.isOpen}
        closeModal={addListModal.close}
      />
      <ConfirmModal
        active={confirmModal.isOpen}
        confirmHandler={() => {
          deleteList(currentList.id);
          confirmModal.close();
        }}
        closeModal={confirmModal.close}>
        Вы уврены, что хотите удалить этот список? Задачи, принадлежащие списку, будут так же
        удалены.
      </ConfirmModal>
    </div>
  );
};

export default Sidebar;
