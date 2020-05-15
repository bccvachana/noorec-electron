import React, { Component } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Loading from "./pages/Loading/Loading";
import Welcome from "./pages/Welcome/Welcome";
import Scan from "./pages/Scan/Scan";
import Menu from "./pages/Menu/Menu";
import Collect from "./pages/Collect/Collect";
import Result from "./pages/Result/Result";

const stateSchema = {
  qrData: {
    userId: null,
    userName: null,
  },
  recordData: {},
  collectMode: null,
  collectType: null,
  deviceData: null,
};

class App extends Component {
  state = {
    ...stateSchema,
    device: null,
  };
  resetState = () => {
    this.setState(stateSchema);
  };
  setDevice = (device) => {
    this.setState({ device: device });
    console.log(this.state.device);
    if (this.state.device) {
      this.state.device.parser.on("data", (result) => {
        this.setDeviceData(result.split(","));
      });
    }
  };
  setDeviceData = (data) => {
    this.setState({ deviceData: data });
  };
  setQrData = (userid, username) => {
    const qrData = {
      userId: userid,
      userName: username,
    };
    this.setState({ qrData: qrData });
  };
  setRecordData = (type, data) => {
    let recordData = { ...this.state.recordData };
    recordData[type] = data;
    this.setState({ recordData: recordData }, () => {
      console.log(this.state.recordData);
    });
  };
  setRecordDataNull = () => {
    this.setState({ recordData: null });
  };
  setCollectMode = (mode) => {
    this.setState({ collectMode: mode });
  };
  setCollectType = (type) => {
    this.setState({ collectType: type });
    console.log(
      `mode::: ${this.state.collectMode}, type::: ${this.state.collectType}`
    );
  };
  render() {
    const routes = [
      { path: "/loading", Component: <Loading /> },
      {
        path: "/welcome",
        Component: (
          <Welcome setDevice={this.setDevice} device={this.state.device} />
        ),
      },
      { path: "/scan", Component: <Scan setQrData={this.setQrData} /> },
      {
        path: "/menu",
        Component: (
          <Menu
            userName={this.state.qrData.userName}
            setCollectMode={this.setCollectMode}
            setCollectType={this.setCollectType}
            setRecordDataNull={this.setRecordDataNull}
          />
        ),
      },
      {
        path: "/collect",
        Component: (
          <Collect
            device={this.state.device}
            deviceData={this.state.deviceData}
            setDeviceData={this.setDeviceData}
            type={this.state.collectType}
            mode={this.state.collectMode}
            setCollectType={this.setCollectType}
            setRecordData={this.setRecordData}
          />
        ),
      },
      {
        path: "/result",
        Component: (
          <Result
            userName={this.state.qrData.userName}
            recordData={this.state.recordData}
          />
        ),
      },
    ];
    return (
      <div>
        <Redirect from="/" to="/result" />
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
      </div>
    );
  }
}

export default withRouter(App);
