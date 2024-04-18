import ModalWrapper from '../Modal/ModalWrapper';
import './ListForm.scss';
import { useEffect, useState } from 'react';

const AddListModal = ({ active, closeModal, data, cancelHandler }) => {
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (data && data.title) {
      setTitle(data.title);
    }
  }, [data]);

  return (
    <ModalWrapper active={active} closeModal={closeModal}>
      <div className="list-form">
        <div className="list-form__content">
          <label htmlFor="listName" className="modal-header">
            название списка
          </label>
          <input
            name="listName"
            onChange={(e) => setTitle(e.target.value)}
            value={title && title.trim()}></input>
        </div>
        <div className="modal-buttons">
          <button onClick={cancelHandler}>Отмена</button>
          <button disabled={!title}>Сохранить</button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddListModal;
