import dayjs from 'dayjs';
import TodosList from '../../TodosList/TodosList';

const AllTasks = () => {
  return (
    <TodosList
      params={{
        completed: true,
      }}
      showForm={false}
    />
  );
};

export default AllTasks;
