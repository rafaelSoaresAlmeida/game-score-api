const Score = require("../models/Score");
const messages = require("../messages/messages")

async function createScore(scoreReq) {

  var scoresTop = await Score.findByGame(scoreReq.game);

    if(scoresTop.length < 10 || scoreReq.score > scoresTop[9].score ){
      scoreDb = await Score.findByEmailAndGame(scoreReq.email, scoreReq.game);
  
      if (!scoreDb) {
        await scoreReq.save();
      } else  if (parseInt(scoreReq.score) > parseInt(scoreDb.score)) {
        scoreDb.score = scoreReq.score;
        await scoreDb.save();
      }

      return createResponse( true, scoreReq.name, scoreReq.game);
    }else{
      return createResponse( ranked)
    }
  }

  async function createResponse( ranked, name, game){
    if(ranked === true) {
      const position = await getCurrentRank(name, game);
      return {ranked:ranked, position:position, message: messages.GET_RANK};
    }
      return {ranked:ranked, mensage: messages.NOT_GET_RANK}; 
  }

  async function getCurrentRank(name, game) {
    var scores = await Score.findByGame(game);
    var index;
    for (index = 0; index < 9; index++) {
      if(scores[index].name === name){
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
