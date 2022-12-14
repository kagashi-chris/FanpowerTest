import axios from "axios";

const ADD_PLAYER = "ADD_PLAYER";
const LOAD_CURRENT_PLAYER_STAT = "LOAD_CURRENT_PLAYER_STAT";
const PLAYER_END_TURN = "PLAYER_END_TURN";
const ADJUST_PLAYER_PINS_KNOCKED = "ADJUST_PLAYER_PINGS_KNOCKED";
const CHECK_GAME_OVER = "CHECK_GAME_OVER";
const RESET_GAME = "RESET_GAME";
const ADD_PLAYERS_SCORE_TO_DATABASE = "ADD_PLAYERS_SCORE_TO_DATABASE";

export const addPlayer = (player) => ({
  type: ADD_PLAYER,
  payload: { player },
});
export const loadCurrentPlayerStat = (playerIdx) => ({
  type: LOAD_CURRENT_PLAYER_STAT,
  payload: {
    playerIdx,
  },
});

export const addScoresToDatabase = (players) => ({
  type: ADD_PLAYERS_SCORE_TO_DATABASE,
  payload: { players },
});

export const resetGame = () => ({ type: RESET_GAME });

export const checkGameOver = () => ({ type: CHECK_GAME_OVER });

export const playerEndTurn = () => ({
  type: PLAYER_END_TURN,
});

export const adjustPlayerPinsKnocked = (
  playerIdx,
  frameIdx,
  dropDownPosition,
  value
) => ({
  type: ADJUST_PLAYER_PINS_KNOCKED,
  payload: {
    playerIdx,
    frameIdx,
    dropDownPosition,
    value,
  },
});

const updateScore = (frame, scoreArr) => {
  let currentTotal = 0;
  //can probably save last updated score position and not have to recalc alot of this.
  for (let i = 0; i < frame.length - 1; i++) {
    let currentVal;
    const zeroIdxVal = Number(frame[i][0]);
    const oneIdxVal = Number(frame[i][1]);
    if (frame[i][0] === null) {
      currentVal = null;
    } else if (zeroIdxVal === 10) {
      currentVal = isStrike(currentTotal + 10, frame, i, 0);
    } else if (zeroIdxVal + oneIdxVal === 10) {
      currentVal = isSpare(currentTotal, frame, i);
    } else {
      currentVal = zeroIdxVal + oneIdxVal + currentTotal;
    }
    if (currentVal !== null) {
      scoreArr[i] = currentVal;
      currentTotal = scoreArr[i];
    } else {
      break;
    }
  }
  if (frame[9][0] !== null) {
    currentTotal =
      currentTotal +
      Number(frame[9][0]) +
      Number(frame[9][1]) +
      Number(frame[9][2]);
    scoreArr[9] = currentTotal;
  }
  return scoreArr;
};

const isStrike = (currentTotal, frame, i, totalNumbersAdded) => {
  if (totalNumbersAdded === 2) return currentTotal;
  if (frame[i + 1][0] === null) {
    return null;
  }
  if (i === 8 && totalNumbersAdded !== 1) {
    return currentTotal + Number(frame[i + 1][0]) + Number(frame[i + 1][1]);
  }
  if (Number(frame[i + 1][0]) !== 10 && totalNumbersAdded !== 1) {
    return currentTotal + Number(frame[i + 1][0]) + Number(frame[i + 1][1]);
  } else if (Number(frame[i + 1][0]) !== 10 && totalNumbersAdded === 1) {
    return currentTotal + Number(frame[i + 1][0]);
  }
  if (frame[i + 1][0] === "10") {
    return isStrike(currentTotal + 10, frame, i + 1, totalNumbersAdded + 1);
  }
};

const isSpare = (currentTotal, frame, i) => {
  if (frame[i + 1][0] === null) return null;
  return (currentTotal += Number(frame[i + 1][0]) + 10);
};

export const createPlayerScores = (gameScores) => {
  return async (dispatch) => {
    try {
      await axios.post("/api/gameScores", gameScores);
      alert("data has been added to database");
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = {
  //each player will have a name, total score, an array of pins knocked per frame per shot, and score for each frame
  players: [],
  currentPlayerTurn: 0,
  currentFrame: 0,
  gameStarted: false,
  gameOver: false,
  winnerIdx: -1,
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case ADJUST_PLAYER_PINS_KNOCKED:
      let updatedPlayer = [...state.players];
      if (action.payload.value === "") {
        updatedPlayer[action.payload.playerIdx].frames[action.payload.frameIdx][
          action.payload.dropDownPosition
        ] = null;
      } else {
        updatedPlayer[action.payload.playerIdx].frames[action.payload.frameIdx][
          action.payload.dropDownPosition
        ] = action.payload.value;
      }

      if (action.payload.dropDownPosition === 0) {
        updatedPlayer[action.payload.playerIdx].frames[
          action.payload.frameIdx
        ][1] = null;
        if (action.payload.frameIdx === 9) {
          updatedPlayer[action.payload.playerIdx].frames[
            action.payload.frameIdx
          ][2] = null;
        }
      }
      return { ...state, players: updatedPlayer };
    case ADD_PLAYER:
      return { ...state, players: [...state.players, action.payload.player] };
    /*
      will cycle through player index whenever end turn button is pressed. whenever it reaches the beginning 
      player index again. it will increment current frame.
      */
    case PLAYER_END_TURN:
      const playerFrame =
        state.players[state.currentPlayerTurn].frames[state.currentFrame];
      if (
        playerFrame[0] === null ||
        (playerFrame[1] === null && playerFrame[0] !== "10")
      ) {
        alert("Invalid Input");
        return { ...state };
      }
      if (state.currentFrame === 9) {
        if (
          (playerFrame[0] === "10" ||
            Number(playerFrame[0]) + Number(playerFrame[1]) === 10) &&
          playerFrame[2] === null
        ) {
          alert("Invalid Input");
          return { ...state };
        }
      }
      const p = state.players[state.currentPlayerTurn];
      const updatePlayer = [...state.players];
      let newScore = updateScore(p.frames, p.frameScore);
      updatePlayer[state.currentPlayerTurn].frameScore = newScore;

      let newPlayer = state.currentPlayerTurn;
      if (state.players.length === 1) {
        newPlayer = 0;
        state.currentFrame = state.currentFrame + 1;
      } else {
        newPlayer++;
        if (newPlayer >= state.players.length) {
          newPlayer = 0;
          state.currentFrame = state.currentFrame + 1;
        }
      }
      state.gameStarted = true;
      return {
        ...state,
        currentPlayerTurn: newPlayer,
        players: updatePlayer,
      };
    case CHECK_GAME_OVER:
      const currentFrame = state.currentFrame;
      const currentPlayerTurn = state.currentPlayerTurn;
      let updatedGameOver = state.gameOver;
      let updatedWinnerIdx = state.winnerIdx;
      if (currentFrame === 10 && currentPlayerTurn === 0) {
        updatedGameOver = true;
        updatedWinnerIdx = 0;

        for (let i = 1; i < state.players.length; i++) {
          if (
            Number(state.players[i].frameScore[9]) >
            Number(state.players[updatedWinnerIdx].frameScore[9])
          ) {
            updatedWinnerIdx = i;
          }
        }
        setTimeout(() => {
          alert(`${state.players[updatedWinnerIdx].name} WINS!!`);
        }, 500);
      }
      return {
        ...state,
        gameOver: updatedGameOver,
        winnerIdx: updatedWinnerIdx,
      };
    case LOAD_CURRENT_PLAYER_STAT:
      return { ...state, winnerIdx: updatedWinnerIdx };
    case RESET_GAME:
      return { ...initialState };
    default:
      return state;
  }
}
