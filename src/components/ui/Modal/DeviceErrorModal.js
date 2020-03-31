import React from "react";
import errorIcon from "../../../assets/Modal/errorIcon.svg";

const DeviceErrorModal = props => {
  return (
    <div>
      <img className="Icon" src={errorIcon} alt="errorIcon" />
      <div className="Title">เกิดข้อผิดพลาด</div>
      <div className={"Detail"}>
        {props.status.isNetwork ? null : (
          <li>ไม่เชื่อมต่อสัญญาณอินเตอร์เน็ต</li>
        )}
        {props.status.isWebcam ? null : <li>ไม่เชื่อมต่อกล้องเว็บแคม</li>}
        {props.status.isArduino ? null : <li>ไม่เชื่อมต่อ NooRec Device</li>}
      </div>
      <div className="Button PrimaryButton" onClick={props.clicked}>
        ลองอีกครั้ง
      </div>
    </div>
  );
};

export default DeviceErrorModal;
