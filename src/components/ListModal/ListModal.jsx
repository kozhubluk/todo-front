import ModalWrapper from '../Modal/ModalWrapper';
import './ListModal.scss';

const ListModal = (props) => {
  return (
    <ModalWrapper {...props}>
      <div className="modal-list">
        <div className="modal-list__header">Выберите список</div>
        <ul>
          {props.data &&
            props.data.map((list) => (
              <li
                className={`modal-list__item${list.id === props.list.id ? ' active' : ''}`}
                onClick={() => props.setList(list)}>
                {list.title}
              </li>
            ))}
        </ul>
      </div>
    </ModalWrapper>
  );
};

export default ListModal;
