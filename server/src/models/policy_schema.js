const { timeStamp } = require("console");
const mongoose = require("mongoose");

const policy_schema = new mongoose.Schema({

  inspection: {
    type: String,
    // required: true,
  },
  detection: {
    type: String,
    // required: true,
  },
  individual_addressing: {
    type: String,
    // required: true,
  },
  group_address_level: {
    type: String,
    // required: true,
  },
  group_address_file: {
    type: String,
    // required: true,
  },
  services: [],
  app_services: [],
  header: {
    type: String,
    // required: true,
  },
  payload: {
    type: String,
    // required: true,
  }},
  { timestamps: true }
);

const Policy_Model = mongoose.model("Policy_Model",policy_schema);
module.exports = Policy_Model;

