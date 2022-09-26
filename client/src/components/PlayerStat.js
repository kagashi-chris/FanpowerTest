import React from "react";
import Frame from "./Frame";
import "./PlayerStat.css";
import { connect } from "react-redux";
import { playerEndTurn, adjustPlayerScore } from "../store/Player";

const PlayerStat = ({
  playerData,
  playerIdx,
  playerEndTurn,
  playerTurn,
  adjustPlayerScore,
}) => {
  const handleEndTurn = () => {
    adjustPlayerScore(0, 0, 30);
    playerEndTurn();
  };

  return (
    <div className="margin_bottom">
      {playerIdx === playerTurn ? (
        <button onClick={() => handleEndTurn()}>End Turn</button>
      ) : (
        ""
      )}
      <div className="player_stat">
        <div className="player_order border_right">
          <p>{playerIdx + 1}</p>
        </div>
        <div className="player_name border_right">
          <div className="row_1">Player Name</div>
          <div className="player_name_input">{playerData.name}</div>
        </div>
        <div className="score">
          {playerData.frames.map((frame, idx) => {
            return <Frame key={idx} idx={idx} playerIdx={playerIdx} />;
          })}
        </div>
        <div>
          <div className="row_1">Total Score</div>
          <div className="total_score">{playerData.totalScore}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { playerTurn: state.players.currentPlayerTurn };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playerEndTurn: () => dispatch(playerEndTurn()),
    adjustPlayerScore: (playerIdx, scoreIdx, score) =>
      dispatch(adjustPlayerScore(playerIdx, scoreIdx, score)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerStat);
