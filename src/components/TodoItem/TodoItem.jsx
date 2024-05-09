import './TodoItem.scss';
import { ReactComponent as XmarkIcon } from '../../assets/svg/xmark.svg';
import { priorities } from '../../assets/priorities';

const TodoItem = ({ data, list, actionHandler, deleteHandler, toggleHandler, updateIsLoading }) => {
  return (
    <div onClick={actionHandler} className={`todo-item${data.completed ? ' done' : ''}`}>
      <label
        onClick={(e) => e.stopPropagation()}
        className={`container ${priorities[data.priority].className}`}>
        <input
          onChange={(e) => {
            if (!updateIsLoading) {
              toggleHandler();
            }
          }}
          checked={data.completed}
          type="checkbox"
        />
        <div className="checkmark"></div>
      </label>
      <div className="todo-item__info">
        <span className="todo-item__list-name">{list}</span>
        <label className="todo-item__title">{data.title}</label>
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
