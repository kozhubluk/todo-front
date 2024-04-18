export const getModalHanlder = (modals, modalName, setModals) => {
  return {
    isOpen: modals[modalName],
    open: () => setModals((state) => ({ ...state, [modalName]: true })),
    close: () => setModals((state) => ({ ...state, [modalName]: false })),
    toggle: () => setModals((state) => ({ ...state, [modalName]: !state[modalName] })),
  };
};
