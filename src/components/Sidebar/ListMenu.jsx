import { useState } from 'react';
import { getModalHanlder } from '../../utils/getModalHanlder';
import {
  useAddListMutation,
  useDeleteListMutation,
  useGetListsQuery,
  useUpdateListMutation,
} from '../../redux/slices/listApiSlice';
import ListItem from './ListItem';
import EditModal from '../AddListModal/EditModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { Snackbar } from '@mui/material';
import { useSnackbar } from '../../hooks/Snackbar';

const ListMenu = () => {
  // Модальные окна
  const [modals, setModals] = useState({
    addList: false,
    editList: false,
    confirm: false,
  });

  const editListModal = getModalHanlder(modals, 'editList', setModals);
  const addListModal = getModalHanlder(modals, 'addList', setModals);
  const confirmModal = getModalHanlder(modals, 'confirm', setModals);

  // Список к которому будут рименяться обновления
  const [currentList, setCurrentList] = useState({});

  // текст можального окна
  const confirmModalText =
    'Вы уврены, что хотите удалить этот список? Задачи, принадлежащие списку, будут так же удалены.';

  // Для работы со списками
  const [addList, { isLoading: addIsLoading }] = useAddListMutation();
  const [deleteList, { isLoading: deleteIsLoading }] = useDeleteListMutation();
  const [updateList, { isLoading: updateIsLoading }] = useUpdateListMutation();
  const { data: lists, isLoading } = useGetListsQuery();

  // snackbar
  const { open, message, handleClose, setSnackbar } = useSnackbar();

  return (
    <>
      <li className="sidebar__header">
        <div className="sidebar__header-title">Мои списки</div>
        <button className="sidebar__add-button" onClick={addListModal.open}>
          +
        </button>
      </li>

      {!isLoading &&
        lists.map((list) => (
          <ListItem
            key={list.id}
            data={list}
            editHandler={() => {
              setCurrentList(list);
              editListModal.open();
            }}
            deleteHandler={() => {
              setCurrentList(list);
              confirmModal.open();
            }}
          />
        ))}

      <EditModal
        modalName={'Название списка'}
        active={editListModal.isOpen}
        data={currentList.title}
        closeModal={editListModal.close}
        saveHandler={async (title) => {
          await updateList({ id: currentList.id, body: { title } })
            .unwrap()
            .then(() => setSnackbar('Список обновлен'))
            .catch((error) => setSnackbar(error.data));

          editListModal.close();
        }}
        cancelHandler={editListModal.close}
        isLoading={updateIsLoading}
      />
      <EditModal
        modalName={'Название списка'}
        active={addListModal.isOpen}
        closeModal={addListModal.close}
        saveHandler={async (title) => {
          await addList({ title })
            .unwrap()
            .then(() => setSnackbar('Список добавлен'))
            .catch((error) => setSnackbar(error.data));

          addListModal.close();
        }}
        cancelHandler={addListModal.close}
        isLoading={addIsLoading}
      />
      <ConfirmModal
        active={confirmModal.isOpen}
        confirmHandler={async () => {
          await deleteList(currentList.id)
            .unwrap()
            .then(() => setSnackbar('Список удален'))
            .catch((error) => setSnackbar(error.data));
          confirmModal.close();
        }}
        cancelHandler={confirmModal.close}
        closeModal={confirmModal.close}
        isLoading={deleteIsLoading}>
        {confirmModalText}
      </ConfirmModal>

      <Snackbar
        sx={{ zIndex: '5000' }}
        open={open}
        autoHideDuration={1500}
        message={message}
        onClose={handleClose}
      />
    </>
  );
};

export default ListMenu;
