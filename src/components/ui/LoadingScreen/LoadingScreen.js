import React from "react";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../Backdrop/Backdrop";
import LoadingDot from "../../ui/LoadingDot/LoadingDot";

const LoadingScreen = props => {
  return (
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames="Fade"
      unmountOnExit
    >
      <Backdrop>
        <LoadingDot width="12vw" color="white" />
      </Backdrop>
    </CSSTransition>
  );
};

export default LoadingScreen;
