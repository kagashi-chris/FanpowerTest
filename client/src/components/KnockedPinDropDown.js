import React from "react";
import "./KnockedPinDropDown.css";

const KnockedPinDropDown = ({ frameIdx, dropDownPosition }) => {
  return (
    <select className="drop_down_select">
      <option></option>
      <option>0</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
      {dropDownPosition === 1 ? <option>Spare</option> : ""}
      {frameIdx === 9 || dropDownPosition === 0 ? <option>Strike</option> : ""}
    </select>
  );
};

export default KnockedPinDropDown;
