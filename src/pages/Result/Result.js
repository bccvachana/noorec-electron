import React from "react";
import { withRouter } from "react-router-dom";
import classes from "./Result.module.scss";

import { criteriaInfo } from "../../utils/criteria";

const resultStatic = {
  bmi: {
    title: "BMI",
  },
  temperature: {
    title: "อุณหภูมิร่างกาย",
    unit: "°C",
  },
  rate: {
    title: "ชีพจร",
    unit: "bpm",
  },
  bloodPressure: {
    title: "ความดันโลหิต",
    unit: "mmHg",
  },
  oxygen: {
    title: "ปริมาณออกซิเจนในเลือด",
    unit: "%",
  },
};

const ResultInfo = (props) => {
  const { type, data, criteria } = props;
  const { title, unit } = resultStatic[type];
  return (
    <div className={classes.Result}>
      <div>{title}</div>
      <div className={classes.ValueContainer}>
        {type === "bloodPressure" ? (
          <div className={classes.Value}>
            {data[0]}
            <span style={{ color: "#b1b3b9", fontWeight: "200" }}> | </span>
            {data[1]} <span className={classes.Unit}>mmHg</span>
          </div>
        ) : (
          <div className={classes.Value}>
            {data} <span className={classes.Unit}>{unit}</span>
          </div>
        )}
        <div className={classes.Criteria}>{criteria}</div>
      </div>
    </div>
  );
};

const Result = (props) => {
  const {
    userName,
    recordData,
    collectMode,
    collectType,
    history: { push },
  } = props;

  const {
    weight,
    height,
    bmi,
    bmiCriteria,
    temperature,
    temperatureCriteria,
    bloodPressureHigh,
    bloodPressureLow,
    bloodPressureCriteria,
    rate,
    rateCriteria,
    oxygen,
    oxygenCriteria,
  } = recordData;

  const resultSwitch = (collectType) => {
    switch (collectType) {
      case "weightHeight":
        return (
          <React.Fragment>
            <div className={classes.WeightHeight}>
              <div>
                น้ำหนัก
                <div className={classes.Value}>
                  {weight} <span className={classes.Unit}>kg</span>
                </div>
              </div>
              <div>
                ส่วนสูง
                <div className={classes.Value}>
                  {height} <span className={classes.Unit}>cm</span>
                </div>
              </div>
            </div>
            <ResultInfo
              type="bmi"
              data={bmi}
              criteria={criteriaInfo.bmi[bmiCriteria].title}
            />
          </React.Fragment>
        );
      case "temperature":
        return (
          <ResultInfo
            type="temperature"
            data={temperature}
            criteria={criteriaInfo.temperature[temperatureCriteria].title}
          />
        );
      case "bloodPressure":
        return (
          <ResultInfo
            type="bloodPressure"
            data={[bloodPressureHigh, bloodPressureLow]}
            criteria={criteriaInfo.bloodPressure[bloodPressureCriteria].title}
          />
        );
      case "rateOxygen":
        return (
          <React.Fragment>
            <ResultInfo
              type="rate"
              data={rate}
              criteria={criteriaInfo.rate[rateCriteria].title}
            />
            <ResultInfo
              type="oxygen"
              data={oxygen}
              criteria={criteriaInfo.oxygen[oxygenCriteria].title}
            />
          </React.Fragment>
        );
      default:
        return null;
    }
  };

  return (
    <div className="FullPageContainer">
      <div className={classes.Title}>
        ข้อมูลสุขภาพของคุณ{" "}
        <span style={{ color: "#fa5458" }}>{userName ? userName : "วจนะ"}</span>
      </div>
      <div
        className={`${classes.Container} ${
          collectMode === "all" ? classes.ContainerAll : ""
        }`}
      >
        {collectMode === "all" ? (
          <React.Fragment>
            <div className={classes.WeightHeight}>
              <div>
                น้ำหนัก
                <div className={classes.Value}>
                  {weight} <span className={classes.Unit}>kg</span>
                </div>
              </div>
              <div>
                ส่วนสูง
                <div className={classes.Value}>
                  {height} <span className={classes.Unit}>cm</span>
                </div>
              </div>
            </div>
            {Object.keys(resultStatic).map((key) =>
              key === "bloodPressure" ? (
                <ResultInfo
                  key={key}
                  type={key}
                  data={[bloodPressureHigh, bloodPressureLow]}
                  criteria={
                    criteriaInfo.bloodPressure[bloodPressureCriteria].title
                  }
                />
              ) : (
                <ResultInfo
                  key={key}
                  type={key}
                  data={recordData[key]}
                  criteria={
                    criteriaInfo[key][recordData[`${key}Criteria`]].title
                  }
                />
              )
            )}
          </React.Fragment>
        ) : (
          resultSwitch(collectType)
        )}
      </div>
      <div className={classes.ButtonContainer}>
        <div
          onClick={() => {
            push({ pathname: "/menu" });
          }}
          className="Button SecondaryButton"
        >
          เมนูหลัก
        </div>
        <div
          onClick={() => {
            push({ pathname: "/welcome" });
          }}
          className="Button PrimaryButton"
        >
          ออกจากระบบ
        </div>
      </div>
    </div>
  );
};

export default withRouter(Result);
