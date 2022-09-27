const Sequelize = require("sequelize");
const db = require("../db");
const DataTypes = require("sequelize/lib/data-types");

const GameScores = db.define("gameScores", {
  winnerIdx: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  // players: {
  //   type: Sequelize.ARRAY(),
  //   allowNull: false,
  // },
});

module.exports = GameScores;
