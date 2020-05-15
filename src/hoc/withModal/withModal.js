import React, { useState } from "react";
import Modal from "../../components/ui/Modal/Modal";

const withModal = (WrappedComponent) => {
  return (props) => {
    const [isModal, setIsModal] = useState(false);
    const [modalComponent, setModalComponent] = useState(null);
    return (
      <React.Fragment>
        <Modal show={isModal}>{modalComponent}</Modal>
        <WrappedComponent
          {...props}
          openModal={(modalComponent) => {
            setIsModal(true);
            setModalComponent(modalComponent);
          }}
          closeModal={() => {
            setIsModal(false);
          }}
        />
      </React.Fragment>
    );
  };
};

export default withModal;
