import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import classes from "./Success.module.scss";
import LoadingDot from "../../../components/ui/LoadingDot/LoadingDot";
import SuccessCheck from "./SuccessCheck";

import { firestore, db } from "../../../utils/firebase";

const Success = (props) => {
  const {
    userId,
    recordData,
    history: { push },
  } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    db.collection("users")
      .doc(userId)
      .update({
        ...recordData,
        record: firestore.FieldValue.arrayUnion({
          ...recordData,
          createdAt: firestore.Timestamp.now(),
        }),
        updatedAt: firestore.Timestamp.now(),
      })
      .then(() => {
        const timer1 = setTimeout(() => {
          clearTimeout(timer1);
          setIsLoading(false);
          const timer2 = setTimeout(() => {
            clearTimeout(timer2);
            push({ pathname: "/result" });
          }, 3500);
        }, 2000);
      });
  }, []);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default withRouter(Success);
