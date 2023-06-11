const mongoose = require("mongoose");

let creditSchema = mongoose.Schema({
  user_id: { type: String, required: true, index: true, unique: true },
  credits: Number,
});

const Credit = mongoose.model("credit", creditSchema);

Credit.ensureIndexes();

module.exports.Credit = Credit;
