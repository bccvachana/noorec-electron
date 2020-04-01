import React from "react";
import { withRouter } from "react-router-dom";
import classes from "./Result.module.scss";

const Result = props => {
  let recordData;
  if (props.recordData) {
    recordData = props.recordData;
    recordData.bmi = (
      recordData.weight /
      ((recordData.height * recordData.height) / 10000)
    ).toFixed(2);
  }

  return (
    <div className="FullPageContainer">
      {recordData ? (
        <React.Fragment>
          <div className={classes.Title}>
            ข้อมูลสุขภาพของคุณ{" "}
            <span style={{ color: "#fa5458" }}>
              {props.userName ? props.userName : "null"}
            </span>
          </div>
          <div className={classes.Container}>
            <div className={classes.WeightHeight}>
              <div>
                น้ำหนัก
                <div className={classes.Value}>
                  {recordData.weight} <span className={classes.Unit}>kg</span>
                </div>
              </div>
              <div>
                ส่วนสูง
                <div className={classes.Value}>
                  {recordData.height} <span className={classes.Unit}>cm</span>
                </div>
              </div>
            </div>
            <div className={`${classes.Result} ${classes.Bmi} `}>
              <div>BMI</div>
              <div className={classes.ValueContainer}>
                <div className={classes.Value}>{recordData.bmi}</div>
                <div className={classes.Criteria}>อ้วน</div>
              </div>
            </div>
            <div className={`${classes.Result} ${classes.Temperature} `}>
              <div>อุณหภูมิร่างกาย</div>
              <div className={classes.ValueContainer}>
                <div className={classes.Value}>
                  {recordData.temperature}{" "}
                  <span className={classes.Unit}>°C</span>
                </div>
                <div className={classes.Criteria}>ปกติ</div>
              </div>
            </div>{" "}
            <div className={`${classes.Result} ${classes.Rate} `}>
              <div>ชีพจร</div>
              <div className={classes.ValueContainer}>
                <div className={classes.Value}>
                  {recordData.rate} <span className={classes.Unit}>bpm</span>
                </div>
                <div className={classes.Criteria}>เร็วผิดปกติ</div>
              </div>
            </div>
            <div className={`${classes.Result} ${classes.BloodPressure} `}>
              <div>ความดันโลหิต</div>
              <div className={classes.ValueContainer}>
                <div className={classes.Value}>
                  {`${recordData.bloodPressureHigh}/${recordData.bloodPressureLow}`}{" "}
                  <span className={classes.Unit}>mmHg</span>
                </div>
                <div className={classes.Criteria}>สูงมาก</div>
              </div>
            </div>
            <div className={`${classes.Result} ${classes.Oxygen} `}>
              <div>ปริมาณออกซิเจนในเลือด</div>
              <div className={classes.ValueContainer}>
                <div className={classes.Value}>
                  {recordData.oxygen} <span className={classes.Unit}>%</span>
                </div>
                <div className={classes.Criteria}>ปกติ</div>
              </div>
            </div>
          </div>
          <div className={classes.ButtonContainer}>
            <div
              onClick={() => {
                props.history.push({ pathname: "/menu" });
              }}
              className="Button SecondaryButton"
            >
              เมนูหลัก
            </div>
            <div
              onClick={() => {
                props.history.push({ pathname: "/welcome" });
              }}
              className="Button PrimaryButton"
            >
              ออกจากระบบ
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default withRouter(Result);
