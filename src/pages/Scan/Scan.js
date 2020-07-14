import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import classes from "./Scan.module.scss";
import QrReader from "react-qr-reader";
import corner from "../../assets/Scan/corner.svg";

import withModal from "../../hoc/withModal/withModal";
import LoadingDot from "../../components/ui/LoadingDot/LoadingDot";
import LoadingScreen from "../../components/ui/LoadingScreen/LoadingScreen";
import QrErrorModal from "../../components/ui/Modal/QrErrorModal";
import QrSuccessModal from "../../components/ui/Modal/QrSuccessModal";

let backToWelcomeTimer, loadTimer;

const Scan = (props) => {
  const {
    history: { push },
    setUserName,
    setUserId,
    openModal,
    closeModal,
  } = props;

  const [isLoading, setIsLoading] = useState(false);

  const setBackToWelcomeTimer = () => {
    backToWelcomeTimer = setTimeout(() => {
      push({ pathname: "/welcome" });
    }, 30000);
  };

  const qrOnScan = (result) => {
    if (result) {
      clearTimeout(backToWelcomeTimer);
      setIsLoading(true);
      let qrData;
      try {
        qrData = JSON.parse(result.slice(1));
      } catch (e) {
        qrData = undefined;
      }
      if (!qrData) {
        try {
          qrData = JSON.parse(result);
        } catch (e) {
          qrData = undefined;
        }
      }
      const { uid, name } = qrData ? qrData : {};
      loadTimer = setTimeout(() => {
        clearTimeout(loadTimer);
        setIsLoading(false);
        if (uid && name) {
          openModal(
            <QrSuccessModal
              username={name}
              confirm={() => {
                setUserName(name);
                setUserId(uid);
                push({ pathname: "/menu" });
              }}
              retry={() => {
                setBackToWelcomeTimer();
                closeModal();
              }}
            />
          );
        } else {
          openModal(<QrErrorModal />);
          loadTimer = setTimeout(() => {
            setBackToWelcomeTimer();
            closeModal();
          }, 3000);
        }
      }, 2500);
    }
  };

  useEffect(() => {
    setBackToWelcomeTimer();
    return () => {
      clearTimeout(backToWelcomeTimer);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="FullPageContainer">
        <div className={classes.QrContainer}>
          <div className={classes.Qr}>
            <QrReader
              delay={1000}
              showViewFinder={false}
              onScan={qrOnScan}
              onError={(err) => {
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
          นำ <span>QR CODE</span> มาสแกนบริเวณกล้อง
        </div>
      </div>
      <LoadingScreen show={isLoading} />
    </React.Fragment>
  );
};

export default withModal(withRouter(Scan));
