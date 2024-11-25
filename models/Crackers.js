const mongoose = require("mongoose");
const Product = require("./Product");

const crackersSchema = new mongoose.Schema({
  quantity: {
    type: String,
    // required: true,
  },
  unit: {
    type: String,
    // required: true,
  },
  pieces: {
    type: String,
    // required: true,
  },
  price: {
    type: String,
    // required: true,
  },
  mlmDiscount: {
    type: String,
    // required: true,
  },
  mlmPrice: {
    type: String,
    // required: true,
  },
  referralDiscount: {
    type: String,
    // required: true,
  },
  referralPrice: {
    type: String,
    // required: true,
  },
  normalDiscount: {
    type: String,
    // required: true,
  },
  normalPrice: {
    type: String,
    // required: true,
  },
  totalQuantity: {
    type: String,
    required: true,
  },
  totalQuantityUnit: {
    type: String,
    required: true,
  },
});

const Crackers = Product.discriminator("Crackers", crackersSchema);

module.exports = Crackers;
