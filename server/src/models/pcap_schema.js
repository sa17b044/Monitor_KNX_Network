const { timeStamp } = require("console");
const mongoose = require("mongoose");

const pcap_schema = new mongoose.Schema(
  {
    originalname: {
      type: String
    }
  },
  { timestamps: true }
  // { timestamps: true }
);

const PCAP_Model = mongoose.model("PCAP_Model", pcap_schema);
module.exports = PCAP_Model;
