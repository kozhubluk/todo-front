import { useEffect, useState } from 'react';
import './SubtaskItem.scss';
import { ReactComponent as XmarkIcon } from '../../assets/svg/xmark.svg';

const SubtaskItem = ({ data, deleteHandler, toggleHandler, onBlurHandler }) => {
  const [text, setText] = useState('');
  useEffect(() => {
    setText(data.title);
  }, [data.title]);

  return (
    <div className={`subtask-item${data.completed ? ' done' : ''}`}>
      <label className={`container`}>
        <input onChange={toggleHandler} checked={data.completed} type="checkbox" />
        <div className="checkmark"></div>
      </label>

      <input
        disabled={data.completed}
        className="subtask-item__title"
        value={text}
        onBlur={() => {
          if (text.trim()) {
            onBlurHandler(text);
          }
        }}
        onChange={(e) => {
          setText(e.target.value);
        }}></input>

      <div className="delete-button">
        <XmarkIcon onClick={deleteHandler} />
      </div>
    </div>
  );
};

export const NewSubtaskButton = ({ onClick }) => {
  return (
    <div onClick={onClick} className="new-subtask">
      <label className="container">
        <div className="checkmark"></div>
      </label>
      <div>
        <div className="new-subtask__title">Добавить новую подзадачу</div>
      </div>
    </div>
  );
};

export const NewSubtaskItem = ({ inputRef, onBlurHandler, onClick }) => {
  const [title, setTitle] = useState('');
  const [visibility, setVisibility] = useState(false);

  const addNewSubtask = () => {
    if (title.trim()) onBlurHandler(title);
    setVisibility(false);
    setTitle('');
  };

  return (
    <div className={`new-subtask-item${!visibility ? ' hidden' : ''}`}>
      <label className="container">
        <div className="checkmark"></div>
      </label>
      <div>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onFocus={() => {
            setVisibility(true);
          }}
          onBlur={addNewSubtask}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addNewSubtask();
          }}
          ref={inputRef}
          className="new-subtask-item__input"
        />
      </div>
    </div>
  );
};

export default SubtaskItem;
