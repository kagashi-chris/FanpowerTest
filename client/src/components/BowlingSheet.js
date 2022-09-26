import React, { useState } from "react";
import "./BowlingSheet.css";
import PlayerStat from "./PlayerStat";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { List, ListItem } from "@mui/material";
import { connect } from "react-redux";
import { addPlayer } from "../store/Player";

const BowlingSheet = ({ players, addPlayer, gameStarted }) => {
  const maxPlayers = 4;
  const [numPlayers, setNumPlayers] = useState(0);
  const [currentPlayerName, setCurrentPlayerName] = useState("");

  const handleAddPlayer = () => {
    const newPlayer = {
      name:
        currentPlayerName === ""
          ? "Player " + (numPlayers + 1)
          : currentPlayerName,
      totalScore: 0,
      frames: [
        [-1, -1],
        [-1, -1],
        [-1, -1],
        [-1, -1],
        [-1, -1],
        [-1, -1],
        [-1, -1],
        [-1, -1],
        [-1, -1],
        [-1, -1, -1],
      ],
      frameScore: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    };
    setNumPlayers(numPlayers + 1);
    addPlayer(newPlayer);
    setCurrentPlayerName("");
  };

  const handleNameChange = (value) => {
    setCurrentPlayerName(value);
  };

  return (
    <div id="bowling_sheet">
      <div>Fanpower Bowling Sheet</div>
      {/* create PlayerStat components depending on how many players are in the players state. Max 4*/}
      <List>
        {players.map((player, idx) => {
          return <PlayerStat key={idx} playerData={player} playerIdx={idx} />;
        })}
        {/* add a new player whenever the + icon is pressed */}
        {players.length < maxPlayers && gameStarted === false ? (
          <ListItem>
            <p className="add_player">Add Player</p>
            <input
              type="text"
              value={currentPlayerName}
              onChange={(event) => handleNameChange(event.target.value)}
            />
            <AddBoxIcon onClick={() => handleAddPlayer()} />
          </ListItem>
        ) : (
          ""
        )}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.players.players,
    gameStarted: state.players.gameStarted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { addPlayer: (player) => dispatch(addPlayer(player)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(BowlingSheet);
