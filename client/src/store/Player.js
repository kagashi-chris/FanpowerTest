const ADD_PLAYER = "ADD_PLAYER";
const ADJUST_PLAYER_SCORE = "ADJUST_PLAYER_SCORE";
const LOAD_CURRENT_PLAYER_STAT = "LOAD_CURRENT_PLAYER_STAT";
const PLAYER_END_TURN = "PLAYER_END_TURN";
const ADJUST_PLAYER_PINS_KNOCKED = "ADJUST_PLAYER_PINGS_KNOCKED";

export const addPlayer = (player) => ({
  type: ADD_PLAYER,
  payload: { player },
});
export const adjustPlayerScore = (playerIdx, scoreIdx, score) => ({
  type: ADJUST_PLAYER_SCORE,
  payload: {
    playerIdx,
    scoreIdx,
    score,
  },
});
export const loadCurrentPlayerStat = (playerIdx) => ({
  type: LOAD_CURRENT_PLAYER_STAT,
  payload: {
    playerIdx,
  },
});

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

const initialState = {
  //each player will have a name, total score, an array of pins knocked per frame per shot, and score for each frame
  players: [],
  currentPlayerTurn: 0,
  currentFrame: 0,
  currentPlayerNumRolls: 0,
  gameStarted: false,
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case ADJUST_PLAYER_PINS_KNOCKED:
      if (action.payload.value === "") {
        state.players[action.payload.playerIdx].frames[action.payload.frameIdx][
          action.payload.dropDownPosition
        ] = null;
      } else {
        console.log("this got run");
        console.log("dropDownPosition", action.payload.dropDownPosition);
        console.log("value", action.payload.value);
        state.players[action.payload.playerIdx].frames[action.payload.frameIdx][
          action.payload.dropDownPosition
        ] = action.payload.value;
      }

      if (action.payload.dropDownPosition === 0) {
        state.players[action.payload.playerIdx].frames[
          action.payload.frameIdx
        ][1] = null;
        if (action.payload.frameIdx === 9) {
          state.players[action.payload.playerIdx].frames[
            action.payload.frameIdx
          ][2] = null;
        }
      }

      return { ...state };
    case ADD_PLAYER:
      return { ...state, players: [...state.players, action.payload.player] };
    /*
      will cycle through player index whenever end turn button is pressed. whenever it reaches the beginning 
      player index again. it will increment current frame.
      */
    case PLAYER_END_TURN:
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
      return { ...state, currentPlayerTurn: newPlayer };
    case ADJUST_PLAYER_SCORE:
      const updatedPlayers = state.players;
      updatedPlayers[action.payload.playerIdx].frameScore[
        action.payload.scoreIdx
      ] = action.payload.score;
      return { ...state, players: updatedPlayers };

    case LOAD_CURRENT_PLAYER_STAT:
      return {};
    default:
      return state;
  }
}
