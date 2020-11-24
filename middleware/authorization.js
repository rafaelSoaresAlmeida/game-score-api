const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../configs/keys");
const authenticationService = require("../services/authenticationService");

const auth = async (req, res, next) => {
  try {
    const user = await authenticationService.getUserOnRequest(req);

    if (!user) {
      throw new Error();
    }

    console.log("passou........ ");
    req.user = user;
    //  req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

module.exports = auth;
