import React, { Component } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Loading from "./pages/Loading/Loading";
import Welcome from "./pages/Welcome/Welcome";
import Scan from "./pages/Scan/Scan";
import Menu from "./pages/Menu/Menu";
import Collect from "./pages/Collect/Collect";
import Test from "./pages/Test/Test";

class App extends Component {
  state = {
    userData: {
      userId: null,
      userName: null
    },
    collectMode: null,
    collectType: null
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
  setCorrectDa;
  render() {
    const routes = [
      { path: "/loading", Component: <Loading /> },
      { path: "/welcome", Component: <Welcome /> },
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
            type={this.state.collectType}
            mode={this.state.collectMode}
            setCollectType={this.setCollectType}
          />
        )
      },
      {
        path: "/test",
        Component: <Test />
      }
    ];
    return (
      <div>
        <Redirect from="/" to="/test" />
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
