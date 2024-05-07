import ModalWrapper from '../Modal/ModalWrapper';
import './ListForm.scss';
import { useEffect, useState } from 'react';

const AddListModal = ({ active, closeModal, data, cancelHandler, saveHandler }) => {
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
          <input name="listName" onChange={(e) => setTitle(e.target.value)} value={title}></input>
        </div>
        <div className="modal-buttons">
          <button onClick={cancelHandler}>Отмена</button>
          <button
            onClick={() => {
              saveHandler({ title: title.trim() });
              setTitle('');
            }}
            disabled={!title.trim()}>
            Сохранить
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddListModal;
