const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  variantType: {
    type: String,
    enum: ["weight", "quantity", "size"],
    required: true,
  },
  variants: [
    {
      sku: {
        type: String,
        required: true,
        // unique: true,
      },
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      pieces:{
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      mlmPrice: {
        type: Number,
      },
      referralPrice: {
        type: Number,
      },
      normalPrice: {
        type: Number,
      },
      mlmDiscount: {
        type: Number,
      },
      referralDiscount: {
        type: Number,
      },
      normalDiscount: {
        type: Number,
      },
      
    },
  ],
  totalQuantity: {
    type: Number,
    required: true,
  },
  totalQuantityUnit: {
    type: String,
    required: true,
  },
});

const Variant = mongoose.model("Variant", variantSchema);
module.exports = Variant;
