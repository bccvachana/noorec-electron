import React, { useEffect, useState } from "react";
import classes from "./Collect.module.scss";
import { withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import CollectStaticType from "./CollectStaticType";
import Instruction from "./Instruction/Instruction";
import Success from "./Success/Success";
import Progress from "../../components/Progress/Progress";

const typeArray = [
  "weightHeight",
  "temperature",
  "bloodPressure",
  "rateOxygen"
];

const setRecord = async (deviceData, setRecordData) => {
  switch (deviceData[1]) {
    case "weightHeight":
      await setRecordData("weight", deviceData[2]);
      await setRecordData("height", deviceData[3]);
      break;
    case "temperature":
      await setRecordData("temperature", deviceData[2]);
      break;
    case "bloodPressure":
      await setRecordData("bloodPressureHigh", deviceData[2]);
      await setRecordData("bloodPressureLow", deviceData[3]);
      break;
    case "rateOxygen":
      await setRecordData("rate", deviceData[2]);
      await setRecordData("oxygen", deviceData[3]);
      break;
    default:
      break;
  }
};

const Collect = props => {
  const stateType = props.type ? props.type : "weightHeight";
  const stateMode = props.mode ? props.mode : "all";
  const currentTypeIndex = typeArray.findIndex(type => type === stateType);
  const [instruction, setInstruction] = useState(true);
  const [success, setSuccess] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log(props.deviceData);
    const condition = stateMode === "all" ? index < 5 : index === 1;
    if (props.deviceData && props.deviceData[0] === "done" && condition) {
      setRecord(props.deviceData, props.setRecordData);
      nextType();
    }
  }, [props.deviceData]);

  useEffect(() => {
    if (stateMode === "all") {
      if (index > 0 && index < 5)
        props.device.port.write((currentTypeIndex + 1).toString());
      else if (index === 5) {
        props.setDeviceData(null);
        props.device.port.write("0");
      }
    } else {
      if (index === 1)
        props.device.port.write((currentTypeIndex + 1).toString());
      else if (index === 2) {
        props.setDeviceData(null);
        props.device.port.write("0");
      }
    }
  }, [index]);

  const nextType = () => {
    if (instruction) {
      setInstruction(false);
    } else {
      if (currentTypeIndex === 3 || stateMode === "one") setSuccess(true);
      else props.setCollectType(typeArray[currentTypeIndex + 1]);
    }
    setIndex(index + 1);
  };

  return (
    <div>
      <CSSTransition
        key={"instruction"}
        in={instruction === true && success === false}
        timeout={600}
        classNames="FadeLeft"
        unmountOnExit
      >
        <Instruction nextType={nextType} />
      </CSSTransition>
      {typeArray.map(type => (
        <CSSTransition
          key={type}
          in={instruction === false && type === stateType && success === false}
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
        <Success />
      </CSSTransition>
      <Progress mode={stateMode} index={index} />
    </div>
  );
};

export default withRouter(Collect);
