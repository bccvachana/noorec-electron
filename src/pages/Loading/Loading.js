import React, { useEffect } from "react";
import classes from "./Loading.module.scss";
import { withRouter } from "react-router-dom";

const Loading = props => {
  useEffect(() => {
    let timer = setTimeout(() => {
      props.history.push({ pathname: "/welcome" });
    }, 8500);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="FullPageContainer">
      <div className={classes.CharacterContainer}>
        <div className={classes.Character}></div>
      </div>
    </div>
  );
};

export default withRouter(Loading);
