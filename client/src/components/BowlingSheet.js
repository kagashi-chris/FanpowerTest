import React, { useState } from "react";
import "./BowlingSheet.css";
import PlayerStat from "./PlayerStat";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { List, ListItem } from "@mui/material";
import { connect } from "react-redux";
import { addPlayer, resetGame, createPlayerScores } from "../store/Player";

const BowlingSheet = ({
  players,
  addPlayer,
  gameStarted,
  resetGame,
  game,
  createPlayerScores,
}) => {
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
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null, null],
      ],
      frameScore: [null, null, null, null, null, null, null, null, null, null],
    };
    setNumPlayers(numPlayers + 1);
    addPlayer(newPlayer);
    setCurrentPlayerName("");
  };

  const handleNameChange = (value) => {
    setCurrentPlayerName(value);
  };

  const handleSaveDataToDatabase = (data) => {
    createPlayerScores(data);
  };

  return (
    <div id="bowling_sheet">
      {/* create PlayerStat components depending on how many players are in the players state. Max 4*/}
      <button
        className="reset_game_btn"
        onClick={() => {
          resetGame();
        }}
      >
        RESET GAME
      </button>
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
        <button
          className="save_game_score_btn"
          onClick={() => {
            handleSaveDataToDatabase(game);
          }}
        >
          Save Game Score
        </button>
      </List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.players.players,
    gameStarted: state.players.gameStarted,
    game: state.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPlayer: (player) => dispatch(addPlayer(player)),
    resetGame: () => dispatch(resetGame()),
    createPlayerScores: (playerScores) =>
      dispatch(createPlayerScores(playerScores)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BowlingSheet);
