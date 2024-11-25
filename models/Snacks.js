const mongoose = require("mongoose");
const Product = require("./Product");

const snacksSchema = new mongoose.Schema({
  weight: [
    {
      value: {
        type: Number,
        // required: true,
      },
      unit: {
        type: String,
        enum: ["gms", "kgs"],
        // required: true,
      },
      price: {
        type: String,
        // required: true,
      },
      mlmPrice: {
        type: String,
      },
      referralPrice: {
        type: String,
      },
      normalPrice: {
        type: String,
      },
    },
  ],
  mlmDiscount: {
    type: String,
    // required: true,
  },
  referralDiscount: {
    type: String,
    // required: true,
  },
  normalDiscount: {
    type: String,
    // required: true,
  },
  totalQuantity: {
    type: String,
    required: true,
  },
});

const Snacks = Product.discriminator("Snacks", snacksSchema);

module.exports = Snacks;
