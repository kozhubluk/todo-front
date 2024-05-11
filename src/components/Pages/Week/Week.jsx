import dayjs from 'dayjs';
import TodosList from '../../TodosList/TodosList';

const Week = () => {
  return (
    <TodosList
      params={{
        startDate: dayjs().format('YYYY-MM-DD'),
      }}
    />
  );
};

export default Week;
