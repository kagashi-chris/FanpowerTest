const router = require("express").Router();
const {
  models: { GameScores },
} = require("../db");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const game = await GameScores.create(req.body);
    res.status(201).send(game);
  } catch (error) {
    next(error);
  }
});
