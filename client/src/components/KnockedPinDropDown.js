import React, { useState, useEffect, useRef } from "react";
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
  const [disable, setDisable] = useState(true);
  const optionSelect = useRef();

  useEffect(() => {
    if (dropDownPosition === 0) {
      setDisable(false);
    }
  }, [dropDownPosition]);

  useEffect(() => {
    const playerFrame = players.players[playerIdx].frames[frameIdx];

    if (dropDownPosition > 0 && playerFrame[dropDownPosition - 1] === null) {
      setDisable(true);
    }

    if (frameIdx !== 9) {
      if (dropDownPosition > 0 && playerFrame[dropDownPosition - 1] !== null) {
        setDisable(false);
        setNumsLeft(10 - playerFrame[0]);
      }
    } else {
      if (dropDownPosition === 1 && playerFrame[0] !== null) {
        setDisable(false);
        if (playerFrame[0] !== "10") {
          setNumsLeft(10 - Number(playerFrame[0]));
        } else {
          setNumsLeft(10);
        }
      }
      if (
        dropDownPosition === 2 &&
        playerFrame[1] !== null &&
        (playerFrame[0] === "10" ||
          Number(playerFrame[0]) + Number(playerFrame[1]) === 10)
      ) {
        setDisable(false);
        if (
          playerFrame[1] !== "10" &&
          Number(playerFrame[0]) + Number(playerFrame[1]) !== 10
        ) {
          setNumsLeft(10 - Number(playerFrame[1]));
        } else {
          setNumsLeft(10);
        }
      } else if (
        dropDownPosition === 2 &&
        (playerFrame[0] !== "10" ||
          Number(playerFrame[0]) + Number(playerFrame[1]) !== 10)
      ) {
        setDisable(true);
      }
    }
  }, [players, dropDownPosition, frameIdx, playerIdx]);

  const handleOptionSelect = (value) => {
    console.log("value", value);
    adjustPlayerPinsKnocked(playerIdx, frameIdx, dropDownPosition, value);
    console.log(players.players[playerIdx].frames);
  };

  return (
    <select
      className="drop_down_select"
      onChange={(event) => {
        handleOptionSelect(event.target.value);
      }}
      ref={optionSelect}
      style={disable === true ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
      <option value={null}> </option>
      {numsLeft > 0 ? <option value={0}>0</option> : ""}
      {numsLeft > 1 ? <option value={1}>1</option> : ""}
      {numsLeft > 2 ? <option value={2}>2</option> : ""}
      {numsLeft > 3 ? <option value={3}>3</option> : ""}
      {numsLeft > 4 ? <option value={4}>4</option> : ""}
      {numsLeft > 5 ? <option value={5}>5</option> : ""}
      {numsLeft > 6 ? <option value={6}>6</option> : ""}
      {numsLeft > 7 ? <option value={7}>7</option> : ""}
      {numsLeft > 8 ? <option value={8}>8</option> : ""}
      {numsLeft > 9 ? <option value={9}>9</option> : ""}
      {dropDownPosition === 0 ||
      (frameIdx === 9 &&
        dropDownPosition > 0 &&
        players.players[playerIdx].frames[frameIdx][dropDownPosition - 1] ===
          "10") ||
      (dropDownPosition === 2 &&
        Number(players.players[playerIdx].frames[frameIdx][0]) +
          Number(players.players[playerIdx].frames[frameIdx][1]) ===
          10) ? (
        <option value={10}>X</option>
      ) : (
        ""
      )}

      {(dropDownPosition === 1 &&
        numsLeft !== 0 &&
        Number(
          players.players[playerIdx].frames[frameIdx][dropDownPosition - 1]
        ) < 10) ||
      (dropDownPosition === 2 &&
        Number(players.players[playerIdx].frames[frameIdx][1]) +
          Number(players.players[playerIdx].frames[frameIdx][0]) !==
          10 &&
        Number(players.players[playerIdx].frames[frameIdx][1]) !== 10) ? (
        <option
          value={
            10 -
            players.players[playerIdx].frames[frameIdx][dropDownPosition - 1]
          }
        >
          /
        </option>
      ) : (
        ""
      )}
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
    adjustPlayerPinsKnocked: (playerIdx, frameIdx, dropDownPosition, value) =>
      dispatch(
        adjustPlayerPinsKnocked(playerIdx, frameIdx, dropDownPosition, value)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KnockedPinDropDown);
