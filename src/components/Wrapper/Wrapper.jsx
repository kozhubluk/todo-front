import Sidebar from '../Sidebar/Sidebar';
import './Wrapper.scss';

const Wrapper = ({ children }) => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Wrapper;
