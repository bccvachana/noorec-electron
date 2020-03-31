import React from "react";
import { withRouter } from "react-router-dom";
import classes from "./Instruction.module.scss";

const Instruction = props => (
  <div className={`Fade FullPageContainer ${classes.Container}`}>
    <div className={classes.Title}>คำแนะนำการใช้งาน</div>
    <div className={classes.Instruction}>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className={classes.ButtonContainer}>
      <div
        className="Button SecondaryButton"
        onClick={() => {
          props.history.push({ pathname: "/menu" });
        }}
      >
        ย้อนกลับ
      </div>
      <div className="Button PrimaryButton" onClick={props.nextType}>
        เริ่ม
      </div>
    </div>
  </div>
);

export default withRouter(Instruction);
