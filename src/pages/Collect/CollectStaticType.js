import React from "react";
import weightHeightMock from "../../assets/Collect/weightHeight.mov";
import temperatureMock from "../../assets/Collect/temperature.mov";
import bloodPressureMock from "../../assets/Collect/bloodPressure.mov";
import rateOxygenMock from "../../assets/Collect/rateOxygen.m4v";

const CollectStaticType = {
  weightHeight: {
    Title: "ตรวจวัดน้ำหนักและส่วนสูง",
    Detail: <div>ยืนบนเครื่องชั่งน้ำหนัก</div>,
    Video: weightHeightMock,
  },
  temperature: {
    Title: "ตรวจวัดอุณหภูมิร่างกาย",
    Detail: <div>วางหน้าผากให้ตรงกับเครื่องวัดอุณหภูมิร่างกาย</div>,
    Video: temperatureMock,
  },
  bloodPressure: {
    Title: "ตรวจวัดความดันโลหิต",
    Detail: (
      <div>
        นั่งตัวตรงบนเก้าอี้พันผ้าพันแขนให้กระชับรอบต้นแขนด้านซ้ายและกดปุ่มเปิด 1
        ครั้ง
        <br />
        รอจนกว่าจะเครื่องจะตรวจวัดเสร็จและถอดผ้าพันแขนวางไว้ที่เดิม
      </div>
    ),
    Video: bloodPressureMock,
  },
  rateOxygen: {
    Title: "ตรวจวัดชีพจรและปริมาณออกซิเจนในเลือด",
    Detail: (
      <div>
        หนีบเครื่องวัดบริเวณปลายนิ้วมือและกดปุ่มเปิด 1 ครั้ง
        <br />
        รอจนกว่าจะเครื่องจะตรวจวัดเสร็จ
      </div>
    ),
    Video: rateOxygenMock,
  },
};

export default CollectStaticType;
