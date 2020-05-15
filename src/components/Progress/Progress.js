import React from "react";
import classes from "./Progress.module.scss";

const Progress = (props) => {
  const { collectMode, index } = props;
  const count = collectMode === "one" ? 3 : 6;

  return (
    <div className={classes.Container}>
      {[...Array(count)].map((_, i) => (
        <React.Fragment key={i}>
          <div
            className={`${classes.Checkpoint} ${
              i < index ? classes.Checked : ""
            } ${i === index ? classes.Current : ""}`}
          ></div>
          {i !== count - 1 ? (
            <div
              className={`${classes.LoadContainer} ${
                i < index ? classes.Loaded : ""
              } ${i === index ? classes.Loading : ""}`}
            >
              <div className={classes.Load}></div>
              <div className={classes.Load}></div>
              <div className={classes.Load}></div>
            </div>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Progress;
