import React, { Component } from "react";
import Modal from "../../components/ui/Modal/Modal";

const withModal = WrappedComponent => {
  return class extends Component {
    state = {
      isModal: false,
      ModalComponent: null
    };
    openModal = ModalComponent => {
      this.setState({
        isModal: true,
        ModalComponent: ModalComponent
      });
    };
    closeModal = () => {
      this.setState({
        isModal: false
      });
    };
    render() {
      return (
        <div>
          <Modal show={this.state.isModal}>{this.state.ModalComponent}</Modal>
          <div className={this.state.isModal ? "Blur" : null}>
            <WrappedComponent
              {...this.props}
              openModal={this.openModal}
              closeModal={this.closeModal}
            />
          </div>
        </div>
      );
    }
  };
};

export default withModal;
