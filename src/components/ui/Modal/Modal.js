import React from "react";
import "./Modal.scss";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../Backdrop/Backdrop";

const Modal = props => {
  return (
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames="Fade"
      unmountOnExit
    >
      <Backdrop>
        <div className="Modal">{props.children}</div>
      </Backdrop>
    </CSSTransition>
  );
};

export default Modal;
