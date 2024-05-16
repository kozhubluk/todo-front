import { useParams } from 'react-router-dom';
import TodosList from '../../TodosList/TodosList';
import NotFound from '../NotFound/NotFound';

const List = () => {
  const { id } = useParams();
  if (!isNaN(id)) return <TodosList id={id} />;
  else return <NotFound />;
};

export default List;
