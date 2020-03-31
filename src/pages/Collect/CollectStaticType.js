import React from "react";
import weightHeightMock from "../../assets/Collect/weightHeightMock.mp4";
import temperatureMock from "../../assets/Collect/temperatureMock.mp4";
import bloodPressureMock from "../../assets/Collect/bloodPressureMock.mp4";
import rateOxygenMock from "../../assets/Collect/rateOxygenMock.mp4";

const CollectStaticType = {
  weightHeight: {
    Title: "ตรวจวัดน้ำหนักและส่วนสูง",
    Detail: <div>ยืนบนเครื่องชั่งน้ำหนัก</div>,
    Video: weightHeightMock
  },
  temperature: {
    Title: "ตรวจวัดอุณหภูมิร่างกาย",
    Detail: (
      <div>วางศีรษะบนที่วางคอให้หน้าผากตรงกับเครื่องวัดอุณหภูมิร่างกาย</div>
    ),
    Video: temperatureMock
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
    Video: bloodPressureMock
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
    Video: rateOxygenMock
  }
};

export default CollectStaticType;
