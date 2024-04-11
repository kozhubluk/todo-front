import './ListForm.scss';
import { useEffect, useState } from 'react';

const ListForm = ({ data }) => {
  const [title, setTitle] = useState(data.title);
  useEffect(() => {
    setTitle(data.title);
  }, [data]);

  return (
    <div className="list-form">
      <input onChange={(e) => setTitle(e.target.value)} value={title}></input>
      <button className="list-form__save-button" disabled={!title.trim()}>
        Сохранить
      </button>
      <button className="list-form__cancel-button">Отменить</button>
    </div>
  );
};

export default ListForm;
