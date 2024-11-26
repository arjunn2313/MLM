const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variant",
        },
        variantSku: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    couponCode: {
      type: String,
      trim: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "completed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre("save", async function (next) {
  if (!this.isModified("items")) return next();

  let totalAmount = 0;
  this.items.forEach((item) => {
    totalAmount += item.totalPrice;
  });

  // if (this.couponCode) {
  //   const discount = 0.1;
  //   totalAmount = totalAmount - totalAmount * discount;
  //   this.discount = totalAmount * discount;
  // }

  this.totalAmount = totalAmount;
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
