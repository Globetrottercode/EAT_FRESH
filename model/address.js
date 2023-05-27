const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = mongoose.Schema({
  saveAs: String,
  username: String,
  floor: String,
  detailed: String, // Complete Address
  landmark: String,
  city: String,
  pincode: String,
});

const Address = mongoose.model("address", addressSchema);

module.exports.Address = Address;
