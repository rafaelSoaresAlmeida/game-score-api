const Score = require("../models/Score");
const messages = require("../messages/messages")

async function createScore(scoreReq) {

  var scoresTop = await Score.findTopFiveScoresByGame(scoreReq.game);

    if(scoresTop.length < 5 || scoreReq.score > scoresTop[4].score ){
      scoreDb = await Score.findByEmailAndGame(scoreReq.email, scoreReq.game);

      if (!scoreDb) {
          var newScore = new Score({ name: scoreReq.name, email: scoreReq.email, score: scoreReq.score , game: scoreReq.game});
          await newScore.save();
          return createResponse( true, messages.GET_RANK, scoreReq.email, scoreReq.game);
      } 
      
      if (parseInt(scoreReq.score) > parseInt(scoreDb.score)) {
        scoreDb.score = scoreReq.score;
        await scoreDb.save();
        return createResponse( true, messages.GET_RANK, scoreReq.email, scoreReq.game);
      }else{
        return createResponse( false, `${messages.EXIT_BEST_OLD_SCORE} ${scoreReq.score} !!!`);
      }
    }else{
      return createResponse( false, messages.NOT_GET_RANK)
    }
  }

  async function createResponse( ranked, msg, email, game){
    if(ranked === true) {
      const position = await getCurrentRank(email, game);
      return {ranked:ranked, message: `${msg} ${position} !!!`};
    }
      return {ranked:ranked, message: msg}; 
  }

  async function getCurrentRank(email, game) {
    var scores = await Score.findTopFiveScoresByGame(game);
    var index;
    for (index = 0; index < 9; index++) {
      if(scores[index].email === email){
        break;
      }
   }
      return index +1;
  }

async function getScoresByGame(game) {
  const scores = await Score.findByGame(game);
  return scores;
}

async function getPosition(game){
  const scores2 = await Score.findByGameArray(game)
  console.log(scores2);
}

module.exports = { createScore, getScoresByGame };
