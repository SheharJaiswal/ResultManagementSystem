require("../db/connstring.js");
const mongoose = require("mongoose");
const resultSchema = mongoose.Schema({
  studentName: {
    type: String,
    allowNull: false, // true by default
  },
  rollNo: {
    type: String,
    allowNull: false,
  },
  score: {
    type: String,
    allowNull: false,
  },
  dob: {
    type: String,
    allowNull: false,
  },
  supervisor: {
    type: String,
    allowNull: false,
  },
  maximumMarks: {
    type: String,
    allowNull: false,
  },
});
const collection = new mongoose.model("collection", resultSchema);
module.exports = collection;
