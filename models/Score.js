const mongoose = require("mongoose");
const { Schema } = mongoose;

const scoreSchema = new Schema({
  name: String,
  email: String,
  score: String,
  game: String,
});

scoreSchema.statics.findByEmailAndGame = async (email, game) => {
  return await Score.find({ email, game });
};

scoreSchema.statics.findByGame = async (game) => {
  return await Score.find({ game }).sort({ score: "descending" }).limit(10);
};

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
