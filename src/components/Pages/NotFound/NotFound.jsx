import src from '../../../assets/img/code404.png';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <img src={src} alt="not found" />
    </div>
  );
};

export default NotFound;
