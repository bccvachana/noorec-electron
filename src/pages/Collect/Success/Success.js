import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import classes from "./Success.module.scss";
import LoadingDot from "../../../components/ui/LoadingDot/LoadingDot";
import SuccessCheck from "./SuccessCheck";

const Success = props => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer, secondtimer;
    timer = setTimeout(() => {
      setIsLoading(false);
      secondtimer = setTimeout(() => {
        props.history.push({ pathname: "/result" });
      }, 3500);
    }, 4000);
    return () => {
      clearTimeout(timer);
      clearTimeout(secondtimer);
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
            <div className={classes.LoadingTitle}>กรุณารอสักครู่</div>
            <div className={classes.Detail}>
              หนูเร็คกำลังบันทึกข้อมูลสุขภาพของคุณค่ะ
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
            <SuccessCheck />
            <div className={classes.SuccessTitle}>เสร็จสมบูรณ์</div>
            <div className={classes.Detail}>
              บันทึกข้อมูลสุขภาพเรียบร้อยแล้วค่ะ
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default withRouter(Success);
