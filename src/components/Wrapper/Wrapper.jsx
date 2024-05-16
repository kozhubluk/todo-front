import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Wrapper.scss';

const Wrapper = ({ children }) => {
  const [active, setActive] = useState(false);

  const show = () => {
    setActive(true);
  };

  const hide = () => {
    setActive(false);
  };

  const toggle = () => {
    setActive((prev) => !prev);
  };

  return (
    <div className="wrapper">
      <Sidebar active={active} hide={hide} show={show} toggle={toggle} />
      <div className="menu-button" onClick={toggle}>
        <span></span>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Wrapper;
