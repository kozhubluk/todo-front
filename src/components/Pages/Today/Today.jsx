import dayjs from 'dayjs';
import TodosList from '../../TodosList/TodosList';

const TodayPage = () => {
  return (
    <TodosList
      params={{
        endDate: dayjs().format('YYYY-MM-DD'),
      }}
      showOverdue={true}
    />
  );
};

export default TodayPage;
