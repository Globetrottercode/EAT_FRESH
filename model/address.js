const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = mongoose.Schema({
  username: String,
  city: String,
  state: String,
  floor: String,
  landmark: String,
  detailed: String,
});

const Address = mongoose.model("address", addressSchema);

module.exports.Address = Address;
