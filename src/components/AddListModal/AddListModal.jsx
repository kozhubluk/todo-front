import { Box, CircularProgress } from '@mui/material';
import ModalWrapper from '../Modal/ModalWrapper';
import './ListForm.scss';
import { useEffect, useState } from 'react';

const AddListModal = ({ active, closeModal, data, cancelHandler, saveHandler, isLoading }) => {
  const [title, setTitle] = useState('');

  // если редактируем, то задаем title начальный
  useEffect(() => {
    if (data && data.title) {
      setTitle(data.title);
    }
    if (!active) {
      setTitle('');
    }
  }, [data, active]);

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
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size="20px" />
            </Box>
          ) : (
            <button
              onClick={() => {
                saveHandler({ title: title.trim() });
              }}
              disabled={!title.trim()}>
              Сохранить
            </button>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddListModal;
