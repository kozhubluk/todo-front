import './TodoItem.scss';
import { ReactComponent as XmarkIcon } from '../../assets/svg/xmark.svg';

const priorityClasses = ['', 'low', 'medium', 'high'];

const TodoItem = ({ title, list, priority, isDone, actionHandler, deleteHandler }) => {
  return (
    <div onClick={actionHandler} className={`todo-item${isDone ? ' done' : ''}`}>
      <label className={`container ${priorityClasses[priority]}`}>
        <input checked={isDone} type="checkbox" />
        <div className="checkmark"></div>
      </label>
      <div>
        <span className="todo-item__list-name">{list}</span>
        <label className="todo-item__title">{title}</label>
      </div>

      <div
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          deleteHandler();
        }}>
        <XmarkIcon />
      </div>
    </div>
  );
};

export default TodoItem;
