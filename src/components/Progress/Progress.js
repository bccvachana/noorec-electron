import React from "react";
import classes from "./Progress.module.scss";

const Progress = props => {
  const count = props.mode === "one" ? 3 : 6;
  return (
    <div className={classes.Container}>
      {[...Array(count)].map((_, i) => (
        <React.Fragment key={i}>
          <div
            className={`${classes.Checkpoint} ${
              i < props.index ? classes.Checked : ""
            } ${i === props.index ? classes.Current : ""}`}
          ></div>
          {i !== count - 1 ? (
            <div
              className={`${classes.LoadContainer} ${
                i < props.index ? classes.Loaded : ""
              } ${i === props.index ? classes.Loading : ""}`}
            >
              <div className={classes.Load}></div>
              <div className={classes.Load}></div>
              <div className={classes.Load}></div>
            </div>
          ) : null}
        </React.Fragment>
      ))}
      {/* <div className={`${classes.Checkpoint} ${classes.Checked}`}></div>
      <div className={`${classes.LoadContainer} ${classes.Loaded}`}>
        <div className={classes.Load}></div>
        <div className={classes.Load}></div>
        <div className={classes.Load}></div>
      </div>
      <div className={`${classes.Checkpoint} ${classes.Current}`}></div>
      <div className={`${classes.LoadContainer} ${classes.Loading}`}>
        <div className={classes.Load}></div>
        <div className={classes.Load}></div>
        <div className={classes.Load}></div>
      </div>
      <div className={`${classes.Checkpoint}`}></div>
      <div className={`${classes.LoadContainer}`}>
        <div className={classes.Load}></div>
        <div className={classes.Load}></div>
        <div className={classes.Load}></div>
      </div>
      <div className={`${classes.Checkpoint}`}></div> */}
    </div>
  );
};

export default Progress;
