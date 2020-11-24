const bcrypt = require("bcryptjs");
const User = require("../models/User");
const roles = require("../configs/roles");
const authenticationService = require("./authenticationService");

async function encryptPassword(pwd) {
  return await bcrypt.hash(pwd, 8);
}

async function createUser(req) {
  const userReq = authenticationService.getUserOnRequest(req);

  console.log(userReq);

  if (!userReq || roles.admin !== userReq.role) {
    console.log("rola está errada");
    //  throw new Error("This operation is just allowed to Admin user roles.");
  }

  const newUser = new User(req.body);

  console.log(newUser);

  userDb = await User.findByEmail(newUser.email);

  if (userDb) {
    throw new Error("Email already exist on database");
  }

  newUser.password = await bcrypt.hash(newUser.password, 8);

  console.log(newUser);

  await newUser.save();

  return newUser;
}

async function getScoresByGame(game) {
  const scores = await Score.findByGame(game);
  return scores;
}

module.exports = { encryptPassword, createUser, getScoresByGame };
