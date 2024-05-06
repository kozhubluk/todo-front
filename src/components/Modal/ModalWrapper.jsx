import './ModalWrapper.scss';
import { ReactComponent as XmarkIcon } from '../../assets/svg/xmark.svg';
import { useRef } from 'react';

const ModalWrapper = ({ active, closeModal, children }) => {
  const modalBox = useRef(null);
  return (
    <div
      className={`modal${active ? ' active' : ''}`}
      onClick={(e) => {
        e.target === e.currentTarget && closeModal();
      }}>
      <div ref={modalBox} className={`modal__box${active ? ' active' : ''}`}>
        <div className="modal__close-button" onClick={closeModal}>
          <XmarkIcon />
        </div>

        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
