import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Welcome.module.scss";

import characterSvg from "../../assets/Welcome/character.svg";
import logoSvg from "../../assets/Welcome/logo.svg";

import withModal from "../../hoc/withModal/withModal";
import DeviceErrorModalHandler from "../../utils/checkDevice";

const Welcome = (props) => {
  const { device, setDevice, openModal, closeModal } = props;

  useEffect(() => {
    if (!device) {
      DeviceErrorModalHandler(openModal, closeModal, setDevice);
    }
  }, []);

  return (
    <div className={`FullPageContainer ${classes.Container}`}>
      <img className={classes.Logo} src={logoSvg} alt="logoSvg" />
      <div className={classes.Detail}>
        เว็บแอปพลิเคชันและอุปกรณ์
        <br />
        สำหรับบันทึกข้อมูลสุขภาพเบื้องต้น
      </div>
      <Link to="/scan">
        <div className={classes.Button}>สแกน QR CODE</div>
      </Link>
      <div className={classes.Character}>
        <img src={characterSvg} alt="characterSvg" />
      </div>
    </div>
  );
};

export default withModal(Welcome);
