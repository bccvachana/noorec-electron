import React, { useEffect, useState } from "react";
import classes from "./Collect.module.scss";
import { withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import CollectStaticType from "./CollectStaticType";
import Instruction from "./Instruction/Instruction";
import Success from "./Success/Success";
import Progress from "../../components/Progress/Progress";

import { criteriaCheck } from "../../utils/criteria";

const typeArray = [
  "weightHeight",
  "temperature",
  "bloodPressure",
  "rateOxygen",
];

const setRecord = async (deviceData, setRecordData) => {
  switch (deviceData[1]) {
    case "weightHeight":
      const weight = deviceData[2];
      const height = deviceData[3];
      const bmi = (weight / ((height * height) / 10000)).toFixed(2);
      setRecordData({
        weight: weight,
        height: height,
        bmi: bmi,
        bmiCriteria: criteriaCheck.bmi(bmi),
      });
      break;
    case "temperature":
      setRecordData({
        temperature: deviceData[2],
        temperatureCriteria: criteriaCheck.temperature(deviceData[2]),
      });
      break;
    case "bloodPressure":
      setRecordData({
        bloodPressureHigh: deviceData[2],
        bloodPressureLow: deviceData[3],
        bloodPressureCriteria: criteriaCheck.bloodPressure(
          deviceData[2],
          deviceData[3]
        ),
      });
      break;
    case "rateOxygen":
      setRecordData({
        rate: deviceData[2],
        rateCriteria: criteriaCheck.rate(deviceData[2]),
        oxygen: deviceData[3],
        oxygenCriteria: criteriaCheck.oxygen(deviceData[3]),
      });
      break;
    default:
      break;
  }
};

const Collect = (props) => {
  const {
    device,
    deviceData,
    setDeviceData,
    collectMode,
    collectType,
    setCollectType,
    recordData,
    setRecordData,
    userId,
  } = props;

  const [instruction, setInstruction] = useState(true);
  const [success, setSuccess] = useState(false);
  const [index, setIndex] = useState(0);

  const currentTypeIndex = typeArray.findIndex((type) => type === collectType);

  useEffect(() => {
    console.log(deviceData);
    const condition = collectMode === "all" ? index < 5 : index === 1;
    if (
      deviceData &&
      deviceData[0] === "done" &&
      deviceData[1] === collectType &&
      condition
    ) {
      setRecord(deviceData, setRecordData);
      nextType();
    }
  }, [deviceData]);

  const nextType = () => {
    if (instruction) {
      setInstruction(false);
    } else {
      if (currentTypeIndex === 3 || collectMode === "one") setSuccess(true);
      else setCollectType(typeArray[currentTypeIndex + 1]);
    }
    setIndex(index + 1);
  };

  useEffect(() => {
    if (collectMode === "all") {
      if (index > 0 && index < 5)
        device.port.write((currentTypeIndex + 1).toString());
      else if (index === 5) {
        setDeviceData(null);
        device.port.write("0");
      }
    } else {
      if (index === 1) device.port.write((currentTypeIndex + 1).toString());
      else if (index === 2) {
        setDeviceData(null);
        device.port.write("0");
      }
    }
  }, [index]);

  return (
    <React.Fragment>
      <CSSTransition
        key={"instruction"}
        in={instruction === true && success === false}
        timeout={600}
        classNames="FadeLeft"
        unmountOnExit
      >
        <Instruction nextType={nextType} />
      </CSSTransition>
      {typeArray.map((type) => (
        <CSSTransition
          key={type}
          in={
            instruction === false && type === collectType && success === false
          }
          timeout={600}
          classNames="FadeLeft"
          unmountOnExit
        >
          <div className={`Fade FullPageContainer ${classes.Container}`}>
            <div className={classes.VideoContainer}>
              <video
                className={classes.Video}
                autoPlay
                loop
                src={CollectStaticType[type].Video}
              />
            </div>
            <div className={classes.Title}>{CollectStaticType[type].Title}</div>
            <div className={classes.Detail}>
              {CollectStaticType[type].Detail}
            </div>
          </div>
        </CSSTransition>
      ))}
      <CSSTransition
        key={"success"}
        in={success === true}
        timeout={600}
        classNames="FadeLeft"
        unmountOnExit
      >
        <Success userId={userId} recordData={recordData} />
      </CSSTransition>
      <Progress collectMode={collectMode} index={index} />
    </React.Fragment>
  );
};

export default withRouter(Collect);
