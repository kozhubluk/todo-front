import Sidebar from '../Sidebar/Sidebar';

const Wrapper = ({ children }) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};

export default Wrapper;
