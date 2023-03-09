require("../db/connstring.js");
const mongoose = require("mongoose");
const teacherSchema = mongoose.Schema({
  teacherName: {
    type: String,
    allowNull: false,
  },
  teacherUsername: {
    type: String,
    allowNull: false,
    unique: true,
  },
  password: {
    type: String,
    allowNull: false,
  },
});
const collection = new mongoose.model("collection43", teacherSchema);
module.exports = collection;
