import TodoItem from '../../TodoItem/TodoItem';
import './Today.scss';

const TodayPage = () => {
  return (
    <div className="today-container">
      <h1>Сегодня</h1>
      <TodoItem title="Сделать отчет по 9й работе" list="ОСТ" priority={0} isDone={true} />
      <TodoItem title="Сделать отчет по 10й работе" list="ПИС" priority={0} isDone={false} />
      <TodoItem title="Поступить в ранхигс" list="карьера" priority={3} isDone={false} />
    </div>
  );
};

export default TodayPage;
