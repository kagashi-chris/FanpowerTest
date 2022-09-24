const ADD_PLAYER = "ADD_PLAYER";
const ADJUST_PLAYER_SCORE = "ADJUST_PLAYER_SCORE";
const LOAD_CURRENT_PLAYER_STAT = "LOAD_CURRENT_PLAYER_STAT";

export const addPlayerAction = (player) => ({ type: ADD_PLAYER, player });
export const adjustPlayerScore = (playerIdx, score) => ({
  type: ADJUST_PLAYER_SCORE,
  payload: {
    playerIdx,
    score,
  },
});
export const loadCurrentPlayerStat = (playerIdx) => ({
  type: LOAD_CURRENT_PLAYER_STAT,
  payload: {
    playerIdx,
  },
});

const initialState = {
  players: [], //contains player score per frame
  playerCurrentScore: [],
  currentPlayerTurn: 0,
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return {};
    case ADJUST_PLAYER_SCORE:
      return {};
    case LOAD_CURRENT_PLAYER_STAT:
      return {};
    default:
      return state;
  }
}
