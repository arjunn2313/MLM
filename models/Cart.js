const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
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
  actualPrice: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
    actualPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    couponCode: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

cartSchema.pre("save", function (next) {
  this.actualPrice = this.items.reduce((acc, item) => {
    return acc + item.actualPrice * item.quantity;
  }, 0);

  this.totalPrice = this.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  this.discountAmount = this.actualPrice - this.totalPrice;

  this.updatedAt = Date.now();
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
