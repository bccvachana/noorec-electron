import React, { Component } from "react";
import mojs from "@mojs/core";

class Check extends mojs.CustomShape {
  getShape() {
    return '<path class="st0" d="M12,56.4l19.2,19.2c1.2,1.2,3.2,1.2,4.4,0c0,0,0,0,0,0L88,23.4"/>';
  }
  getLength() {
    return 105.99502563476562;
  } // optional
}
mojs.addShape("check", Check); // passing name and Bubble class

class SucessCheck extends Component {
  componentDidMount() {
    const circle = new mojs.Shape({
      delay: 500,
      parent: "#check",
      shape: "circle",
      fill: "#fa5458",
      radius: { 0: 80 },
      duration: 1000,
      scale: 1.5,
      easing: "circ.inout"
    });
    const check = new mojs.Shape({
      parent: "#check",
      easing: "ease.inout",
      shape: "check",
      fill: "none",
      stroke: "white",
      strokeWidth: 10,
      strokeDasharray: "100%",
      strokeDashoffset: { "100%": "0%" },
      duration: 900,
      scale: 2
    });
    const lines = new mojs.Burst({
      delay: 200,
      parent: "#check",
      radius: { 65: 75 },
      angle: 0,
      count: 8,
      scale: 2,
      children: {
        shape: "line",
        radius: 20,
        scale: 1,
        stroke: "#feb562",
        strokeWidth: 4,
        strokeDasharray: "100%",
        strokeDashoffset: { "-100%": "100%" },
        duration: 700,
        easing: "quad.out"
      }
    });
    const timeline = new mojs.Timeline({ speed: 1.5 });
    timeline.append(circle, check, lines);
    timeline.play();
  }
  render() {
    return (
      <div
        id="check"
        style={{
          position: "relative",
          width: "13vw",
          height: "13vw"
        }}
      />
    );
  }
}

export default SucessCheck;
