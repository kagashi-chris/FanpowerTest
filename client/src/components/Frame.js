import React from "react";
import "./PlayerStat.css";
import "./Frame.css";
import KnockedPinDropDown from "./KnockedPinDropDown";
import { connect } from "react-redux";
import { adjustPlayerPinsKnocked } from "../store/Player";

const Frame = ({ idx, frame, playerIdx, playerTurn, players }) => {
  return (
    <div className="frame border_right">
      <div className="row_1">{idx + 1}</div>
      <div
        className="pins_knocked_container"
        style={
          idx === frame && playerIdx === playerTurn
            ? {}
            : { pointerEvents: "none", opacity: "0.4" }
        }
      >
        <div className="pins_knocked">
          <KnockedPinDropDown
            frameIdx={idx}
            playerIdx={playerIdx}
            dropDownPosition={0}
          />
        </div>
        <div className="pins_knocked">
          <KnockedPinDropDown
            frameIdx={idx}
            playerIdx={playerIdx}
            dropDownPosition={1}
          />
        </div>
        {idx === 9 ? (
          <div className="pins_knocked">
            <KnockedPinDropDown
              frameIdx={idx}
              playerIdx={playerIdx}
              dropDownPosition={2}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="frame_score">
        {players[playerIdx].frameScore[idx] > -1
          ? players[playerIdx].frameScore[idx]
          : ""}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    playerTurn: state.players.currentPlayerTurn,
    frame: state.players.currentFrame,
    players: state.players.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adjustPlayerPinsKnocked: (playerIdx, frameIdx, rollNumber, value) =>
      dispatch(adjustPlayerPinsKnocked(playerIdx, frameIdx, rollNumber, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Frame);
