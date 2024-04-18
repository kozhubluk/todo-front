import ModalWrapper from '../Modal/ModalWrapper';
import './ConfirmModal.scss';

const ConfirmModal = ({ active, closeModal, children, confirmHandler, cancelHandler }) => {
  return (
    <ModalWrapper active={active} closeModal={closeModal}>
      <div className="confirm-modal">
        <div className="confirm-modal__content">
          <div className="modal-header">Подтвердите действие</div>
          <div className="confirm-modal__message">{children}</div>
        </div>
        <div className="modal-buttons">
          <button onClick={cancelHandler}>Отмена</button>
          <button onClick={confirmHandler}>Подтвердить</button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmModal;
