const Score = require("../models/Score");
const scoreService = require("../services/scoreService");
const authorization = require("../middleware/authorization");

module.exports = (app) => {
  app.post("/score", authorization, async (req, res) => {
    try {
      const scoreResult = await scoreService.createScore(
        new Score(req.body.score)
      );
      res.send({ scoreResult });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  app.get("/score/:game", async (req, res) => {
    const scores = await scoreService.getScoresByGame(req.param("game"));
    res.send({ scores });
  });
};
