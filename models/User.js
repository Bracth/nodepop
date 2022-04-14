"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// make the scheme //

const userSchema = mongoose.Schema({
  email: { type: String, unique: true, index: true, required: true },
  password: { type: String, unique: true, required: true },
});

// static metod //

userSchema.statics.hashPassword = function (passwordVanilla) {
  return bcrypt.hash(passwordVanilla, 7);
};

// instance method //

userSchema.methods.comparePassword = function (passwordVanilla) {
  console.log(passwordVanilla, this);
  return bcrypt.compare(passwordVanilla, this.password);
};

// make the model //
const User = mongoose.model("User", userSchema);

// export the model //
module.exports = User;
