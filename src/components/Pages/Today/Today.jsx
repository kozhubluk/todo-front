import dayjs from 'dayjs';
import TodosList from '../../TodosList/TodosList';

const TodayPage = () => {
  return (
    <TodosList
      params={{
        startDate: dayjs().format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
      }}
    />
  );
};

export default TodayPage;
