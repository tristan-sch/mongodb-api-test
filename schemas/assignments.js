const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const assignmentsSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  comment: {
    type: String,
  },
  url: {
    type: String,
  },
});
module.exports = SkateSpot = mongoose.model("assignments", assignmentsSchema);
