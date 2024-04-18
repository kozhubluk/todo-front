import { useState } from 'react';
import './SubtaskItem.scss';
import { ReactComponent as XmarkIcon } from '../../assets/svg/xmark.svg';

const SubtaskItem = ({ title, isDone }) => {
  return (
    <div className={`subtask-item${isDone ? ' done' : ''}`}>
      <label class={`container`}>
        <input checked={isDone} type="checkbox" />
        <div class="checkmark"></div>
      </label>

      <input disabled={isDone} className="subtask-item__title" value={title}></input>

      <div className="delete-button">
        <XmarkIcon />
      </div>
    </div>
  );
};

export const NewSubtaskButton = ({ onClick }) => {
  return (
    <div onClick={onClick} className="new-subtask">
      <label class="container">
        <div class="checkmark"></div>
      </label>
      <div>
        <div className="new-subtask__title">Добавить новую подзадачу</div>
      </div>
    </div>
  );
};

export const NewSubtaskItem = ({ inputRef }) => {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className={`new-subtask-item${!visibility ? ' hidden' : ''}`}>
      <label class="container">
        <div class="checkmark"></div>
      </label>
      <div>
        <input
          onFocus={() => {
            console.log('!');
            setVisibility(true);
          }}
          onBlur={() => setVisibility(false)}
          ref={inputRef}
          className="new-subtask-item__input"
        />
      </div>
    </div>
  );
};

export default SubtaskItem;
