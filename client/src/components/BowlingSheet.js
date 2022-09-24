import * as React from "react";
import "./BowlingSheet.css";
import PlayerStat from "./PlayerStat";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { List, ListItemButton, ListItem, ListItemText } from "@mui/material";

export default function BowlingSheet() {
  const maxPlayers = 4;
  const [players, setPlayers] = React.useState([]);
  const [currentPlayerTurn, setCurrentPlayerTurn] = React.useState(0);

  const handleAddPlayer = () => {
    setPlayers([
      ...players,
      {
        name: `New Player ${players.length + 1}`,
        pinsKnockedPerRound: [[], [], [], [], [], [], [], [], [], []],
        scorePerRound: [],
      },
    ]);
  };

  return (
    <div id="bowling_sheet">
      <div>Fanpower Bowling Sheet</div>
      {/* create PlayerStat components depending on how many players are in the players param. Max 4*/}
      <List>
        {players.map((user, idx) => {
          return <PlayerStat />;
        })}
        {/* add a new player whenever the + icon is pressed */}
        {players.length < maxPlayers ? (
          <ListItemButton onClick={() => handleAddPlayer()}>
            <AddCircleIcon />
            <ListItemText>ADD PLAYER</ListItemText>
          </ListItemButton>
        ) : (
          ""
        )}
      </List>
    </div>
  );
}
