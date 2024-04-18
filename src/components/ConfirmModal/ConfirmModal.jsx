const ConfirmModal = ({ children }) => {
  return (
    <div className="confirm-modal">
      <div className="confirm-modal__message">{children}</div>
      <div className="confirm-modal__buttons">
        <button></button>
        <button></button>
      </div>
    </div>
  );
};
