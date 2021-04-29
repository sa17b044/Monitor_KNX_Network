// const { timeStamp } = require("console");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    data: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Read-Only",
      enum:['Read-Only','Admin']
    },
  },
  { timestamps: true }
);

const Users_Model = mongoose.model("Users_Model", userSchema);
module.exports = Users_Model;