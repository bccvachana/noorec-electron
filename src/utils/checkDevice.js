import React from "react";
import DeviceErrorModal from "../components/ui/Modal/DeviceErrorModal";
import { checkPort, startPort } from "./arduino";

const checkWebcam = async () => {
  const mediaDevices = await navigator.mediaDevices.enumerateDevices();
  const webcamList = mediaDevices.filter((device) => {
    return device.kind === "videoinput";
  });
  return webcamList.length !== 0 ? true : false;
};

const checkDevice = async () => {
  const isNetwork = navigator.onLine;
  const isWebcam = await checkWebcam();
  const isArduino = await checkPort();
  return isNetwork && isWebcam && isArduino
    ? null
    : {
        isNetwork: isNetwork,
        isWebcam: isWebcam,
        isArduino: isArduino,
      };
};

const DeviceErrorModalHandler = async (openModal, closeModal, setDevice) => {
  const deviceStatus = await checkDevice();
  if (deviceStatus) {
    let time = setTimeout(() => {
      openModal(
        <DeviceErrorModal
          status={deviceStatus}
          clicked={() => {
            closeModal();
            DeviceErrorModalHandler(openModal, closeModal, setDevice);
          }}
        />
      );
      clearTimeout(time);
    }, 500);
  } else {
    setDevice(await startPort());
  }
};

export default DeviceErrorModalHandler;
