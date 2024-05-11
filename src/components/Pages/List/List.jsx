import { useParams } from 'react-router-dom';
import TodosList from '../../TodosList/TodosList';

const List = () => {
  const { id } = useParams();
  return <TodosList id={id} />;
};

export default List;
