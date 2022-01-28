const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const assignmentsSchema = new Schema({
  unique_id: {
    type: String,
    required: true,
  },
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
});
module.exports = SkateSpot = mongoose.model("assignments", assignmentsSchema);
