import React, { Component } from "react";
import mojs from "@mojs/core";

class Test extends Component {
  componentDidMount() {
    const circle = new mojs.Shape({
      parent: "#cen",
      shape: "circle",
      isShowStart: true
    });
    setTimeout(() => {
      this.ddd();
    }, 3000);
  }

  lines = new mojs.Burst({
    radius: { 30: 75 },
    angle: 0,
    count: 8,
    children: {
      shape: "line",
      radius: 20,
      scale: 1.2,
      stroke: "#000000",
      strokeDasharray: "100%",
      strokeDashoffset: { "-100%": "100%" },
      duration: 700,
      easing: "quad.out"
    }
  });
  ddd = () => {
    const cen = document.getElementById("cen").getBoundingClientRect();
    const timeline = new mojs.Timeline({ speed: 1.5 });
    timeline.add(this.lines);
    timeline.play();
  };
  render() {
    return (
      <div onClick={this.ddd} className="FullPageContainer">
        <div
          id="cen"
          style={{
            backgroundColor: "red",
            width: "20vw",
            height: "20vw",
            position: "absolute",
            top: 0,
            left: 0
          }}
        ></div>
      </div>
    );
  }
}

export default Test;
