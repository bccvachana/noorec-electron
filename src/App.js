import React, { useState, useEffect } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Loading from "./pages/Loading/Loading";
import Welcome from "./pages/Welcome/Welcome";
import Scan from "./pages/Scan/Scan";
import Menu from "./pages/Menu/Menu";
import Collect from "./pages/Collect/Collect";
import Result from "./pages/Result/Result";

const App = (props) => {
  const [device, setDevice] = useState(null);
  const [deviceData, setDeviceData] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [collectMode, setCollectMode] = useState("");
  const [collectType, setCollectType] = useState("");
  const [recordData, setRecordData] = useState({});

  useEffect(() => {
    if (device) {
      console.log(device);
      device.parser.on("data", (result) => {
        setDeviceData(result.split(","));
      });
    }
  }, [device]);

  useEffect(() => {
    console.log(`mode::: ${collectMode}, type::: ${collectType}`);
  }, [collectType]);

  useEffect(() => {
    console.log(recordData);
  }, [recordData]);

  const routes = [
    { path: "/loading", Component: <Loading /> },
    {
      path: "/welcome",
      Component: <Welcome setDevice={setDevice} device={device} />,
    },
    {
      path: "/scan",
      Component: <Scan setUserName={setUserName} setUserId={setUserId} />,
    },
    {
      path: "/menu",
      Component: (
        <Menu
          userName={userName}
          setCollectMode={setCollectMode}
          setCollectType={setCollectType}
          setRecordData={setRecordData}
        />
      ),
    },
    {
      path: "/collect",
      Component: (
        <Collect
          device={device}
          deviceData={deviceData}
          setDeviceData={setDeviceData}
          collectType={collectType}
          collectMode={collectMode}
          setCollectType={setCollectType}
          recordData={recordData}
          setRecordData={(data) => {
            setRecordData((prev) => {
              return { ...prev, ...data };
            });
          }}
          userId={userId}
        />
      ),
    },
    {
      path: "/result",
      Component: (
        <Result
          userName={userName}
          recordData={recordData}
          collectMode={collectMode}
          collectType={collectType}
        />
      ),
    },
  ];

  return (
    <React.Fragment>
      <Redirect from="/" to="/menu" />
      <div className="FadeContainer">
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
            {(props) => (
              <CSSTransition
                in={props.match != null}
                timeout={500}
                classNames="Fade"
                unmountOnExit
              >
                <div className="Fade">{Component}</div>
              </CSSTransition>
            )}
          </Route>
        ))}
      </div>
    </React.Fragment>
  );
};

export default withRouter(App);
