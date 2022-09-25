const ADD_PLAYER = "ADD_PLAYER";
const ADJUST_PLAYER_SCORE = "ADJUST_PLAYER_SCORE";
const LOAD_CURRENT_PLAYER_STAT = "LOAD_CURRENT_PLAYER_STAT";
const PLAYER_END_TURN = "PLAYER_END_TURN";

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

const initialState = {
  //each player will have a name, total score, an array of pins knocked per frame per shot, and score for each frame
  players: [],
  playerNames: [],
  playerTotalScores: [],
  playerFrames: [],
  playerScorePerFrame: [],
  currentPlayerTurn: 0,
  currentFrame: 0,
  gameStarted: false,
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return {
        ...state,
        playerNames: [...state.playerNames, action.payload.player.name],
        playerTotalScores: [
          ...state.playerTotalScores,
          action.payload.player.totalScore,
        ],
        playerFrames: [...state.playerFrames, action.payload.player.frames],
        playerScorePerFrame: [
          ...state.playerScorePerFrame,
          action.payload.player.frameScore,
        ],
      };
    /*
      will cycle through player index whenever end turn button is pressed. whenever it reaches the beginning 
      player index again. it will increment current frame.
      */
    case PLAYER_END_TURN:
      let newPlayer;
      let newFrame = state.currentFrame;
      if (state.players.length === 1) {
        newFrame = newFrame + 1;
      } else if (state.currentPlayerTurn + 1 > state.players.length - 1) {
        newPlayer = 0;
        //will move to next frame if it cycled through all the players
        newFrame++;
      } else {
        newPlayer = state.currentPlayerTurn + 1;
      }
      return { ...state, currentFrame: newFrame, currentPlayerTurn: newPlayer };
    case ADJUST_PLAYER_SCORE:
      console.log("score adjusted");
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
