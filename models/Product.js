// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     productCode: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     category: {
//       type: String,
//       enum: ["Snacks", "Crackers"],
//       required: true,
//     },
//     productCategory: {
//       type: String,
//       required: true,
//     },
//     productName: {
//       type: String,
//       required: true,
//     },
//     gst: {
//       type: String,
//     },
//     photos: {
//       type: [String],
//     },
//     status: {
//       type: String,
//       required: true,
//       enum: ["active", "inactive", "out of stock"],
//       default: "inactive",
//     },
//     isActive: {
//       type: Boolean,
//       default: false,
//       required: true,
//     },
//     averageRating: { type: Number, default: 0 },
//     reviewCount: { type: Number, default: 0 },
//   },
//   { timestamps: true, discriminatorKey: "productType" }
// );

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ["Snacks", "Crackers"],
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    gst: {
      type: String,
    },
    photos: {
      type: [String],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "out of stock"],
      default: "inactive",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
