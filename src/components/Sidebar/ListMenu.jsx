import { useState } from 'react';
import { getModalHanlder } from '../../utils/getModalHanlder';
import {
  useAddListMutation,
  useDeleteListMutation,
  useGetListsQuery,
  useUpdateListMutation,
} from '../../redux/slices/listApiSlice';
import ListItem from './ListItem';
import AddListModal from '../AddListModal/AddListModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

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

  //
  const confirmModalText =
    'Вы уврены, что хотите удалить этот список? Задачи, принадлежащие списку, будут так же удалены.';

  // Для работы со списками
  const [addList, { isLoading: addIsLoading }] = useAddListMutation();
  const [deleteList, { isLoading: deleteIsLoading }] = useDeleteListMutation();
  const [updateList, { isLoading: updateIsLoading }] = useUpdateListMutation();
  const { data: lists, isLoading } = useGetListsQuery();

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

      <AddListModal
        active={editListModal.isOpen}
        data={currentList}
        closeModal={editListModal.close}
        saveHandler={async (body) => {
          await updateList({ id: currentList.id, body })
            .unwrap()
            .then((payload) => console.log('fulfilled', payload))
            .catch((error) => console.error('rejected', error));

          editListModal.close();
        }}
        cancelHandler={editListModal.close}
        isLoading={updateIsLoading}
      />
      <AddListModal
        active={addListModal.isOpen}
        closeModal={addListModal.close}
        saveHandler={async (body) => {
          await addList(body)
            .unwrap()
            .then((payload) => console.log('fulfilled', payload))
            .catch((error) => console.error('rejected', error));

          addListModal.close();
        }}
        cancelHandler={addListModal.close}
        isLoading={addIsLoading}
      />
      <ConfirmModal
        active={confirmModal.isOpen}
        confirmHandler={async () => {
          await deleteList(currentList.id);
          confirmModal.close();
        }}
        closeModal={confirmModal.close}
        isLoading={deleteIsLoading}>
        {confirmModalText}
      </ConfirmModal>
    </>
  );
};

export default ListMenu;
