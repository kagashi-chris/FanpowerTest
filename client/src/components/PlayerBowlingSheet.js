import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const PlayerBowlingSheet = () => {
  const [userBowlingSheet, setUserBowlingSheet] = React.useState({
    playerName: "",
  });
  const frames = 10;
  const triesPerFrame = 2;
  const triesForLastFrame = 3;

  for (let i = 0; i < frames - 1; i++) {
    const frame = [];
    for (let j = 0; j < triesPerFrame; j++) {
      frames.push([]);
    }
    setUserBowlingSheet([...userBowlingSheet, frame]);
  }

  //set up last frame since last frame is different than the other frame

  return (
    <div>
      <div className="player_name">Name</div>
    </div>
  );
};

export default PlayerBowlingSheet;
