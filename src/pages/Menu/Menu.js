import React from "react";
import { withRouter } from "react-router-dom";
import classes from "./Menu.module.scss";

import weightHeightSvg from "../../assets/Menu/weightHeight.svg";
import temperatureSvg from "../../assets/Menu/temperature.svg";
import bloodPressureSvg from "../../assets/Menu/bloodPressure.svg";
import rateOxygenSvg from "../../assets/Menu/rateOxygen.svg";
import allSvg from "../../assets/Menu/all.svg";

const Menu = props => {
  const button = [
    {
      name: "น้ำหนัก / ส่วนสูง",
      img: weightHeightSvg,
      alt: "weightHeightSvg",
      type: "weightHeight"
    },
    {
      name: "อุณหภูมิร่างกาย",
      img: temperatureSvg,
      alt: "temperatureSvg",
      type: "temperature"
    },
    {
      name: "ความดันโลหิต",
      img: bloodPressureSvg,
      alt: "bloodPressureSvg",
      type: "bloodPressure"
    },
    {
      name: "ชีพจร / ออกซิเจนในเลือด",
      img: rateOxygenSvg,
      alt: "rateOxygenSvg",
      type: "rateOxygen"
    },
    {
      name: "ทั้งหมด",
      img: allSvg,
      alt: "allSvg",
      type: "weightHeight"
    }
  ];
  return (
    <div className="FullPageContainer">
      <div className={classes.Title}>
        สวัสดีคุณ{" "}
        <span style={{ color: "#fa5458" }}>
          {props.userName ? props.userName : "null"}
        </span>
      </div>
      <div className={classes.Detail}>เลือกสิ่งที่ต้องการตรวจวัด</div>
      <div className={classes.MenuContainer}>
        {button.map(({ name, img, alt, type }) => (
          <div
            key={name}
            className={`animated fadeInUp ${classes.MenuButton}`}
            onClick={async () => {
              if (name === "ทั้งหมด") await props.setCollectMode("all");
              else await props.setCollectMode("one");
              await props.setCollectType(type);
              props.history.push({ pathname: "/collect" });
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
