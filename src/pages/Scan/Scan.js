import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classes from "./Scan.module.scss";
import QrReader from "react-qr-reader";
import corner from "../../assets/Scan/corner.svg";

import withModal from "../../hoc/withModal/withModal";
import LoadingDot from "../../components/ui/LoadingDot/LoadingDot";
import LoadingScreen from "../../components/ui/LoadingScreen/LoadingScreen";
import QrErrorModal from "../../components/ui/Modal/QrErrorModal";
import QrSuccessModal from "../../components/ui/Modal/QrSuccessModal";

let backTimer, loadTimer;

class Scan extends Component {
  state = {
    isLoading: false
  };
  setBackTimeOut = () => {
    backTimer = setTimeout(() => {
      this.props.history.push({ pathname: "/welcome" });
    }, 10000);
  };
  retryScan = () => {
    clearTimeout(loadTimer);
    this.setBackTimeOut();
    this.props.closeModal();
  };
  qrOnScan = result => {
    if (result) {
      clearTimeout(backTimer);
      this.setState({ isLoading: true });
      let qrData;
      try {
        qrData = JSON.parse(result);
      } catch (e) {
        qrData = undefined;
      }
      if (qrData && qrData.username && qrData.userid) {
        loadTimer = setTimeout(() => {
          clearTimeout(loadTimer);
          this.setState({ isLoading: false });
          this.props.openModal(
            <QrSuccessModal
              username={qrData.username}
              confirm={() => {
                this.props.getQrData(qrData.userid, qrData.username);
                this.props.history.push({ pathname: "/menu" });
              }}
              retry={this.retryScan}
            />
          );
        }, 2500);
      } else {
        loadTimer = setTimeout(() => {
          clearTimeout(loadTimer);
          this.setState({ isLoading: false });
          this.props.openModal(<QrErrorModal />);
          loadTimer = setTimeout(() => {
            this.retryScan();
          }, 3000);
        }, 2500);
      }
    }
  };
  componentDidMount() {
    this.setBackTimeOut();
  }
  componentWillUnmount() {
    clearTimeout(backTimer);
    clearTimeout(loadTimer);
  }
  render() {
    return (
      <div>
        <div className="FullPageContainer">
          <div className={classes.QrContainer}>
            <div className={classes.Qr}>
              <QrReader
                delay={1000}
                showViewFinder={false}
                onScan={this.qrOnScan}
                onError={err => {
                  console.log(err);
                }}
                style={{ width: "100%" }}
              />
              <div className={classes.QrFade}>
                <LoadingDot width="7vw"></LoadingDot>
              </div>
              <div className={classes.QrFadeUp}></div>
              <div className={classes.QrFadeDown}></div>
            </div>
            <div className={classes.QrBorder}></div>
            <div className={classes.Corner}>
              <img src={corner} alt="corner"></img>
            </div>
          </div>
          <div className={classes.Detail}>
            นำ <span>QR CODE {this.props.qrData}</span> มาสแกนบริเวณกล้อง
          </div>
        </div>
        <LoadingScreen show={this.state.isLoading} />
      </div>
    );
  }
}

export default withModal(withRouter(Scan));
