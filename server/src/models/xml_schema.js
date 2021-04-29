const { timeStamp } = require("console");
const mongoose = require("mongoose");

const xml_schema = new mongoose.Schema(
  {
    originalname: {
      type: String
    }
  }
  // { timestamps: true }
);

const XML_Model = mongoose.model("XML_Model", xml_schema);
module.exports = XML_Model;
