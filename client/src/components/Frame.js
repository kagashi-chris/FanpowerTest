import React from "react";
import "./PlayerStat.css";
import "./Frame.css";
import KnockedPinDropDown from "./KnockedPinDropDown";

const Frame = ({ idx, frameTotal }) => {
  return (
    <div className="frame border_right">
      <div className="row_1">{idx + 1}</div>
      <div className="pins_knocked_container">
        <div className="pins_knocked">
          <KnockedPinDropDown frameIdx={idx} dropDownPosition={0} />
        </div>
        <div className="pins_knocked">
          <KnockedPinDropDown frameIdx={idx} dropDownPosition={1} />
        </div>
        {idx === 9 ? (
          <div className="pins_knocked">
            <KnockedPinDropDown frameIdx={idx} dropDownPosition={2} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="frame_score">{frameTotal}</div>
    </div>
  );
};

export default Frame;
