import React, { useState } from "react";
import "./KnockedPinDropDown.css";
import { connect } from "react-redux";
import { adjustPlayerPinsKnocked } from "../store/Player";

const KnockedPinDropDown = ({
  frameIdx,
  dropDownPosition,
  players,
  playerIdx,
  adjustPlayerPinsKnocked,
}) => {
  const [numsLeft, setNumsLeft] = useState(10);

  const handleOptionSelect = (value) => {
    console.log("value selected: ", value);
    adjustPlayerPinsKnocked(playerIdx, frameIdx, dropDownPosition, value);
  };

  return (
    <select
      className="drop_down_select"
      onChange={(event) => {
        handleOptionSelect(event.target.value);
      }}
    >
      <option value={null}></option>
      {numsLeft > 0 ? <option value={0}>0</option> : ""}
      {numsLeft >= 1 ? <option value={1}>1</option> : ""}
      {numsLeft >= 2 ? <option value={2}>2</option> : ""}
      {numsLeft >= 3 ? <option value={3}>3</option> : ""}
      {numsLeft >= 4 ? <option value={4}>4</option> : ""}
      {numsLeft >= 5 ? <option value={5}>5</option> : ""}
      {numsLeft >= 6 ? <option value={6}>6</option> : ""}
      {numsLeft >= 7 ? <option value={7}>7</option> : ""}
      {numsLeft >= 8 ? <option value={8}>8</option> : ""}
      {numsLeft >= 9 ? <option value={9}>9</option> : ""}
      {numsLeft >= 10 ? <option value={10}>10</option> : ""}
      {dropDownPosition === 1 ? <option>Spare</option> : ""}
      {frameIdx === 9 || dropDownPosition === 0 ? <option>Strike</option> : ""}
    </select>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adjustPlayerPinsKnocked: (playerIdx, frameIdx, rollNumber, value) =>
      dispatch(adjustPlayerPinsKnocked(playerIdx, frameIdx, rollNumber, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KnockedPinDropDown);
