import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import classes from "./Menu.module.scss";

import weightHeightSvg from "../../assets/Menu/weightHeight.svg";
import temperatureSvg from "../../assets/Menu/temperature.svg";
import bloodPressureSvg from "../../assets/Menu/bloodPressure.svg";
import rateOxygenSvg from "../../assets/Menu/rateOxygen.svg";
import allSvg from "../../assets/Menu/all.svg";
import logOutSvg from "../../assets/Menu/logOut.svg";

const Menu = (props) => {
  const {
    history: { push },
    userName,
    setCollectType,
    setCollectMode,
    setRecordData,
  } = props;

  useEffect(() => {
    setCollectMode("");
    setCollectType("");
    setRecordData({});
  }, []);

  const button = [
    {
      name: "น้ำหนัก | ส่วนสูง",
      img: weightHeightSvg,
      alt: "weightHeightSvg",
      type: "weightHeight",
    },
    {
      name: "อุณหภูมิร่างกาย",
      img: temperatureSvg,
      alt: "temperatureSvg",
      type: "temperature",
    },
    {
      name: "ความดันโลหิต",
      img: bloodPressureSvg,
      alt: "bloodPressureSvg",
      type: "bloodPressure",
    },
    {
      name: "ชีพจร | ออกซิเจนในเลือด",
      img: rateOxygenSvg,
      alt: "rateOxygenSvg",
      type: "rateOxygen",
    },
    {
      name: "ทั้งหมด",
      img: allSvg,
      alt: "allSvg",
      type: "weightHeight",
    },
  ];

  return (
    <div className="FullPageContainer">
      <div className={classes.Nav}>
        <img
          src={logOutSvg}
          alt="logOutSvg"
          onClick={() => push({ pathname: "/welcome" })}
        />
      </div>
      <div className={classes.Title}>
        สวัสดีคุณ{" "}
        <span style={{ color: "#fa5458" }}>{userName ? userName : "null"}</span>
      </div>
      <div className={classes.Detail}>เลือกสิ่งที่ต้องการตรวจวัดได้เลยค่ะ</div>
      <div className={classes.MenuContainer}>
        {button.map(({ name, img, alt, type }) => (
          <div
            key={name}
            className={`animated fadeInUp ${classes.MenuButton}`}
            onClick={async () => {
              if (name === "ทั้งหมด") setCollectMode("all");
              else setCollectMode("one");
              setCollectType(type);
              push({ pathname: "/collect" });
            }}
          >
            <img src={img} alt={alt} />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default withRouter(Menu);
