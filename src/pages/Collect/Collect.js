import React, { useEffect, useState } from "react";
import classes from "./Collect.module.scss";
import { withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import CollectStaticType from "./CollectStaticType";
import Instruction from "./Instruction/Instruction";
import Success from "./Success/Success";
import Progress from "../../components/Progress/Progress";
import { startPort } from "../../utils/arduino";

const typeArray = [
  "weightHeight",
  "temperature",
  "bloodPressure",
  "rateOxygen"
];

const Collect = props => {
  const stateType = props.type ? props.type : "weightHeight";
  const stateMode = props.mode ? props.mode : "all";
  const [device, setDevice] = useState(null);
  const [data, setData] = useState([]);
  const [instruction, setInstruction] = useState(true);
  const [success, setSuccess] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let getDevice;
    const arduino = async () => {
      getDevice = await startPort();
      const timer = setTimeout(() => {
        setDevice(getDevice);
        clearTimeout(timer);
      }, 500);
    };
    arduino();
  }, []);

  // useEffect(() => {
  //   if (device) {
  //     console.log("open");
  //     device.parser.on("data", result => {
  //       setData(result.split(","));
  //     });
  //   }
  // }, [device]);

  useEffect(() => {
    console.log(data);
    if (stateMode === "all") {
      if (data && data[0] === "done" && index < 5) nextType();
    } else {
      if (data && data[0] === "done" && index === 1) nextType();
    }
  }, [data]);

  useEffect(() => {
    if (device && index === 1) {
      console.log("open");
      device.parser.on("data", result => {
        setData(result.split(","));
      });
    }
    const currentTypeIndex = typeArray.findIndex(type => type === stateType);
    if (stateMode === "all") {
      if (device && index > 0 && index < 5)
        device.port.write((currentTypeIndex + 1).toString());
      else if (index === 5) {
        device.port.close(() => {
          console.log("close");
        });
      }
    } else {
      if (device && index === 1)
        device.port.write((currentTypeIndex + 1).toString());
      else if (index === 2) {
        device.port.close(() => {
          console.log("close");
        });
      }
    }

    // document.onkeydown = event => {
    //   switch (event.keyCode) {
    //     case 37:
    //       backType();
    //       break;
    //     default:
    //       break;
    //   }
    // };
  }, [index]);

  const nextType = () => {
    const currentTypeIndex = typeArray.findIndex(type => type === stateType);
    if (instruction) {
      setInstruction(false);
    } else {
      if (success) {
        props.history.push({ pathname: "menu" });
      }
      if (currentTypeIndex === 3 || stateMode === "one") setSuccess(true);
      else props.setCollectType(typeArray[currentTypeIndex + 1]);
    }
    setIndex(index + 1);
  };

  // const backType = () => {
  //   const currentTypeIndex = typeArray.findIndex(type => type === stateType);
  //   if (instruction) {
  //     props.history.push({ pathname: "menu" });
  //   } else {
  //     if (success) {
  //       props.setCollectType(typeArray[currentTypeIndex]);
  //     } else {
  //       if (currentTypeIndex === 0 || stateMode === "one")
  //         props.history.push({ pathname: "menu" });
  //       else props.setCollectType(typeArray[currentTypeIndex - 1]);
  //     }
  //     setSuccess(false);
  //   }
  //   setIndex(index - 1);
  // };

  return (
    <div>
      <CSSTransition
        key={"instruction"}
        in={instruction === true && success === false}
        timeout={600}
        classNames="FadeLeft"
        unmountOnExit
      >
        <Instruction nextType={nextType} device={device} />
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
        <Success nextType={nextType} />
      </CSSTransition>
      <Progress mode={stateMode} index={index} />
    </div>
  );
};

export default withRouter(Collect);
