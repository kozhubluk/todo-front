import { Link } from 'react-router-dom';
import './StartPage.scss';

const StartPage = () => {
  return (
    <div className="welcome-block">
      <h1 className="welcome-block__header">
        Организуйте <br />
        список дел удобно
      </h1>
      <h2 className="welcome-block__description">
        Планировщик - это удобный список дел, который станет вашим незаменимым помощником в
        упорядочении задач и повышении продуктивности.
      </h2>
      <Link to="/today" className="welcome-block__button">
        Начать планировать
      </Link>
    </div>
  );
};

export default StartPage;
