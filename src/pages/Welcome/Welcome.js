import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./Welcome.module.scss";

import triangleSvg from "../../assets/Welcome/triangle.svg";
import characterSvg from "../../assets/Welcome/character.svg";
import logoSvg from "../../assets/Welcome/logo.svg";

import withModal from "../../hoc/withModal/withModal";
import DeviceErrorModalHandler from "../../utils/checkDevice";

class Welcome extends Component {
  componentDidMount() {
    if (!this.props.device) {
      DeviceErrorModalHandler(
        this.props.openModal,
        this.props.closeModal,
        this.props.setDevice
      );
    }
  }
  render() {
    return (
      <div>
        <div className={`FullPageContainer ${classes.Container}`}>
          <img
            className={classes.Triangle}
            src={triangleSvg}
            alt="triangleSvg"
          />
          <div className={classes.Character}>
            <img src={characterSvg} alt="characterSvg" />
          </div>
          <img className={classes.Logo} src={logoSvg} alt="logoSvg" />
          <div className={classes.Detail}>
            แชทบอทและอุปกรณ์
            <br />
            สำหรับบันทึกข้อมูลสุขภาพเบื้องต้น
          </div>
          <Link to="/scan">
            <div className={classes.Button}>สแกน QR CODE</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default withModal(Welcome, true);
