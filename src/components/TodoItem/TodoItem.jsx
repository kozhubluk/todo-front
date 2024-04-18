import './TodoItem.scss';
import { ReactComponent as XmarkIcon } from '../../assets/svg/xmark.svg';

const priorityClasses = ['', 'low', 'medium', 'high'];

const TodoItem = ({ title, list, priority, isDone }) => {
  return (
    <div className={`todo-item${isDone ? ' done' : ''}`}>
      <label class={`container ${priorityClasses[priority]}`}>
        <input checked={isDone} type="checkbox" />
        <div class="checkmark"></div>
      </label>
      <div>
        <span className="list-name">{list}</span>
        <label className="todo-item__title">{title}</label>
      </div>

      <div className="delete-button">
        <XmarkIcon />
      </div>
    </div>
  );
};

export default TodoItem;
