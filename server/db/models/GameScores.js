const Sequelize = require("sequelize");
const db = require("../db");

const GameScores = db.define("gamescores", {
  winnerIdx: {
    type: Sequelize.INTEGER,
  },
  gameOver: {
    type: Sequelize.BOOLEAN,
  },
  gameStarted: {
    type: Sequelize.BOOLEAN,
  },
  currentPlayerTurn: {
    type: Sequelize.INTEGER,
  },
  currentFrame: {
    type: Sequelize.INTEGER,
  },
  players: {
    type: Sequelize.STRING,
    get: function () {
      return JSON.parse(this.getDataValue("myArrayField"));
    },
    set: function (val) {
      return this.setDataValue("myArrayField", JSON.stringify(val));
    },
  },
});

module.exports = GameScores;
