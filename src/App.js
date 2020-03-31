import React, { Component } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Loading from "./pages/Loading/Loading";
import Welcome from "./pages/Welcome/Welcome";
import Scan from "./pages/Scan/Scan";
import Menu from "./pages/Menu/Menu";
import Collect from "./pages/Collect/Collect";

class App extends Component {
  state = {
    userData: {
      userId: null,
      userName: null
    },
    collectMode: null,
    collectType: null,
    device: null,
    deviceData: null
  };
  resetState = () => {
    this.setState({
      userData: {
        userId: null,
        userName: null
      },
      collectMode: null,
      collectType: null
    });
  };
  setDevice = device => {
    this.setState({ device: device });
    console.log(this.state.device);
    if (this.state.device) {
      this.state.device.parser.on("data", result => {
        this.setDeviceData(result.split(","));
      });
    }
  };
  setDeviceData = data => {
    this.setState({ deviceData: data });
  };
  getQrData = (userid, username) => {
    const qrData = {
      userId: userid,
      userName: username
    };
    this.setState({ userData: qrData });
  };
  setCollectMode = mode => {
    this.setState({ collectMode: mode });
  };
  setCollectType = type => {
    this.setState({ collectType: type });
  };
  render() {
    const routes = [
      { path: "/loading", Component: <Loading /> },
      {
        path: "/welcome",
        Component: (
          <Welcome setDevice={this.setDevice} device={this.state.device} />
        )
      },
      { path: "/scan", Component: <Scan getQrData={this.getQrData} /> },
      {
        path: "/menu",
        Component: (
          <Menu
            userName={this.state.userData.userName}
            setCollectMode={this.setCollectMode}
            setCollectType={this.setCollectType}
          />
        )
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
          />
        )
      }
    ];
    return (
      <div>
        <Redirect from="/" to="/loading" />
        <div className="FadeContainer">
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {props => (
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
