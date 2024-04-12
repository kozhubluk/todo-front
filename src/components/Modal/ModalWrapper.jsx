import './ModalWrapper.scss';
import { ReactComponent as CloseIcon } from '../../assets/svg/close.svg';

const ModalWrapper = ({ active, setActive, children }) => {
  const closeModal = () => {
    setActive(false);
  };

  return (
    <div className={`modal${active ? ' active' : ''}`} onClick={closeModal}>
      <div
        className={`modal__box${active ? ' active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div className="modal__close-button" onClick={closeModal}>
          <CloseIcon />
        </div>

        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
