import ModalWrapper from '../Modal/ModalWrapper';
import './ListModal.scss';

const ListModal = (props) => {
  return (
    <ModalWrapper {...props}>
      <div className="modal-list">
        <div className="modal-list__header">Выберите список</div>
        <ul>
          <li className="modal-list__item active">Js dfd sddfsd fsdf sdf sdf CN</li>
          <li className="modal-list__item">Lorem, ipsum.</li>
        </ul>
      </div>
    </ModalWrapper>
  );
};

export default ListModal;
