import React from "react";

const QrSuccessModal = (props) => {
  return (
    <div>
      <div className="Title">
        สวัสดี, คุณ <span>{props.username}</span>
      </div>
      <div className={"Detail"}>กรุณากดยืนยันเพื่อทำรายการต่อ</div>
      <div className="Button SecondaryButton" onClick={props.retry}>
        สแกนอีกครั้ง
      </div>
      <div className="Button PrimaryButton" onClick={props.confirm}>
        ยืนยัน
      </div>
    </div>
  );
};

export default QrSuccessModal;
