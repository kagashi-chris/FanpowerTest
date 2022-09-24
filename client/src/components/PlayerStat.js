import React from "react";
import Frame from "./Frame";
import "./PlayerStat.css";

const PlayerStat = () => {
  return (
    <div className="player_stat">
      <div className="player_order border_right">
        <p>1</p>
      </div>
      <div className="player_name border_right">
        <div className="row_1">Player Name</div>
        <div className="player_name_input">
          <p>Some Name</p>
        </div>
      </div>
      <div className="score">
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
      </div>
      <div className="total_score">
        <div className="row_1">Total Score</div>
        <div>100</div>
      </div>
    </div>
  );
};

export default PlayerStat;
