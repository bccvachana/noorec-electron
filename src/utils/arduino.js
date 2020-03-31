const SerialPort = window.require("serialport");

let port, parser, portName;

export const checkPort = async () => {
  let isArduino = false;
  const portList = await SerialPort.list();
  if (portList.length !== 0) {
    portList.forEach(port => {
      isArduino =
        port.manufacturer && port.manufacturer.includes("arduino")
          ? true
          : false;
    });
  }
  return isArduino;
};

export const startPort = async () => {
  const Readline = SerialPort.parsers.Readline;
  const portList = await SerialPort.list();
  if (portList.length !== 0) {
    portList.forEach(port => {
      portName =
        port.manufacturer && port.manufacturer.includes("arduino")
          ? port.path
          : null;
    });
  }
  port = portName ? new SerialPort(portName) : null;
  parser = port ? port.pipe(new Readline({ delimiter: "\r\n" })) : null;
  return { port, parser };
};
