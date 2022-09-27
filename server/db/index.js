const Sequelize = require("sequelize");
const db = require("./db");

const GameScores = require("./models/GameScores");

module.exports = {
  db,
  models: {
    GameScores,
  },
};
