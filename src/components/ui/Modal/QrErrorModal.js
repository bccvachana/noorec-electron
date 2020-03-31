import React from "react";
import scanIcon from "../../../assets/Modal/scanIcon.svg";

const QrErrorModal = props => {
  return (
    <div>
      <img className="Icon" src={scanIcon} alt="scanIcon" />
      <div className="Title">QR CODE ไม่ถูกต้อง</div>
      <div className={"Detail"}>โปรดสแกนใหม่อีกครั้ง</div>
    </div>
  );
};

export default QrErrorModal;
