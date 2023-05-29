const mongoose = require("mongoose");
const { Schema } = mongoose;

let creditSchema = mongoose.Schema({
  username: String,
  credits: Number,
});

const Credit = mongoose.model("credit", creditSchema);

module.exports.Credit = Credit;
