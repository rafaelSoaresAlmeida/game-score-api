const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const roles = require("../configs/roles");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  role: {
    type: String,
    required: true,
    minLength: 5,
    validate: (currentRole) => {
      if (roles.admin !== currentRole && roles.user !== currentRole) {
        throw new Error({ error: "Invalid role name" });
      }
    },
  },
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid login credentials");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid login credentials");
  }
  return user;
};

userSchema.statics.findByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
