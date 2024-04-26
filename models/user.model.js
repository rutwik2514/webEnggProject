const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    reqiured: true,
  },
  email: {
    type: String,
    reqiured: true,
    unique: true,
  },
  username: {
    type: String,
    reqiured: true,
    unique: true,
  },
  password: {
    type: String,
    reqiured: true,
  },
  portfolio: {
    type: Array,
    default: [],
  },
  balance: {
    type: Number,
    default: 5000,
  },
  transactions: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  lastPrediction: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);