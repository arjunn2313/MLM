const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
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
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    guestId: { type: String },
    guestInfo: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      address: {
        line1: { type: String },
        line2: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String },
      },
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Credit Card", "Debit Card", "UPI"],
      default: "Cash on Delivery",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Pending","Confirmed", "Dispatched", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentDetails: {
      transactionId: { type: String },
      paymentDate: { type: Date },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    actualAmount: {
      type: Number,
      // required: true,
    },
    taxAmount: {
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
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    estimatedDelivery: {
      type: Date,
    },
    cancelReason: {
      type: String,
    },
    orderNotes: {
      type: String,
    },
    deliveryPartner: {
      type: String,
    },
    trackingId: {
      type: String,
    },
    trackingLink: {
      type: String,
    },
  },
  { timestamps: true }
);

// orderSchema.pre("validate", function (next) {
//   if (!this.user && !this.guestInfo) {
//     return next(new Error("Either user or guestInfo must be provided."));
//   }
//   next();
// });

orderSchema.pre("save", function (next) {
  if (this.items && this.items.length > 0) {
    this.totalAmount = this.items.reduce((sum, item) => {
      return sum + item.totalPrice;
    }, 0);

    this.totalAmount = this.totalAmount + this.taxAmount - this.discountAmount;
  } else {
    this.totalAmount = 0;
  }

  next();
});

orderSchema.pre("validate", function (next) {
  if (
    this.paymentStatus === "Completed" &&
    (!this.paymentDetails || !this.paymentDetails.transactionId)
  ) {
    return next(
      new Error("Transaction ID is required for completed payments.")
    );
  }
  next();
});

orderSchema.index({ orderId: 1 });
orderSchema.index({ user: 1 });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
