import './ListForm.scss';
import { useEffect, useState } from 'react';

const ListForm = ({ data, cancelHandler }) => {
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (data.title) {
      setTitle(data.title);
    }
  }, [data]);

  return (
    <div className="list-form">
      <div className="list-form__content">
        <div className="list-form__header">название списка</div>
        <input onChange={(e) => setTitle(e.target.value)} value={title && title.trim()}></input>
      </div>
      <div className="list-form__buttons">
        <button onClick={cancelHandler}>Отмена</button>
        <button disabled={!title}>Сохранить</button>
      </div>
    </div>
  );
};

export default ListForm;
