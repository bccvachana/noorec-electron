import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import classes from "./Success.module.scss";
import LoadingDot from "../../../components/ui/LoadingDot/LoadingDot";

const Success = props => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <CSSTransition
        key="loading"
        in={isLoading}
        timeout={500}
        classNames="Fade"
        unmountOnExit
        enter={false}
      >
        <div className={`Fade FullPageContainer ${classes.Container}`}>
          <div className={classes.Loading}>
            <LoadingDot width="12vw" color="#fa5458" />
            <div className={classes.Title}>กรุณารอสักครู่</div>
            <div className={classes.Detail}>
              หนูเร็คกำลังบันทึกข้อมูลสุขภาพของคุณ
            </div>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        key="success"
        in={!isLoading}
        timeout={500}
        classNames="Fade"
        unmountOnExit
        exit={false}
      >
        <div className={`Fade FullPageContainer ${classes.Container}`}>
          <div className={classes.Success}>
            <div onClick={props.nextType} className="Button PrimaryButton">
              Menu
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default withRouter(Success);
