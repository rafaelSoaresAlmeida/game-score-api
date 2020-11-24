const jwt = require("jsonwebtoken");
const keys = require("../configs/keys");
const User = require("../models/User");

async function generateAuthToken(user) {
  return jwt.sign({ _id: user._id }, keys.jwtKey);
}

async function getUserOnRequest(req) {
  const token = req.header("Authorization").replace("Bearer ", "");
  const data = jwt.verify(token, keys.jwtKey);
  const user = await User.findOne({ _id: data._id });
  return user;
}

module.exports = { generateAuthToken, getUserOnRequest };
