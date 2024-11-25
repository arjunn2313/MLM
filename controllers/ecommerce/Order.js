const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const Review = require("../../models/Review");
const User = require("../../models/User");
const Agent = require("../../models/User");
const Address = require("../../models/Address");

const generateOrderId = () => {
  const timestamp = Date.now().toString();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();
  return `ORD-${timestamp}-${randomSuffix}`;
};

// Initiate checkout
const procedToCheckout = async (req, res) => {
  try {
    const { userId } = req.user;

    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const orderId = generateOrderId();

    const orderItems = cart.items.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    // Create a new order
    const order = new Order({
      orderId,
      user: userId,
      items: orderItems,
      totalAmount: cart.totalPrice,
      actualAmount: cart.actualPrice,
      discountAmount: cart.discountAmount,
      couponCode: cart.couponCode,
    });

    await order.save();

    // cart.items = [];
    await cart.save();

    res
      .status(201)
      .json({ message: "Order initiated successfully", orderId, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

//  get checkout details
const getCheckoutDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Checkout details retrieved successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const updateShippingAddress = async (req, res) => {
  try {
    const { orderId, shippingAddressId } = req.body;

    
    
    const { userId } = req.user;

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
      status: "Pending",
      orderStatus: "Pending",
    });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or already processed" });
    }

    const shippingAddress = await Address.findOne({
      _id: shippingAddressId,
      userId: userId,
    });

 
    
    if (!shippingAddress) {
      return res.status(404).json({ message: "Shipping address not found" });
    }

    order.shippingAddress = shippingAddress._id;

    await order.save();

    res.status(200).json({
      message: "Shipping address updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update Shipping Address Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const confirmPaymentAndOrder = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;
    const { userId } = req.user;

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
      status: "Pending",
      orderStatus: "Pending",
    });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or already processed" });
    }

    const validPaymentMethods = [
      "Cash on Delivery",
      "Credit Card",
      "Debit Card",
      "UPI",
    ];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    order.paymentMethod = paymentMethod;
    order.paymentStatus = "Completed";
    order.orderStatus = "Completed";

    await order.save();

    res.status(200).json({
      message: "Order payment confirmed successfully",
      order,
    });
  } catch (error) {
    console.error("Confirm Payment and Order Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// CREATE ORDER
const placeOrder = async (req, res) => {
  try {
    const { paymentMethod, shippingAddress } = req.body;
    const { userId } = req.user;

    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const orderId = generateOrderId();

    const orderItems = cart.items.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    // Create a new order
    const order = new Order({
      orderId,
      user: userId,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount: cart.totalPrice,
      orderStatus: "Completed",
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", orderId, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all orders for a user
const getOrders = async (req, res) => {
  try {
    const { userId } = req.user;

    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .populate("shippingAddress");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Buy now
const buyNow = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const { userId } = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const parsedQuantity = Number(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const price = (await user.isMlmAgent) ? product.mlmPrice : product.price;
    const totalAmount = Number(price) * parsedQuantity;

    const orderId = await generateOrderId();

    const order = new Order({
      user: userId,
      orderId,
      items: [
        {
          product: product._id,
          quantity: parsedQuantity,
          price: price,
        },
      ],
      shippingAddress: user.defaultShippingAddress,
      paymentMethod: "Cash on Delivery",
      totalAmount,
    });

    await order.save();

    res.status(201).json({
      message: "Order Addded for checkout",
      order,
    });
  } catch (error) {
    console.error("Buy Now Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get buy now
const getBuynow = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.user;

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
      paymentStatus: "Pending",
      orderStatus: "Pending",
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({
        message: "No pending Buy Now order found with the provided ID",
      });
    }

    // Return the order details
    res.status(200).json({
      message: "Buy Now order retrieved successfully",
      order,
    });
  } catch (error) {
    console.error("Get Buy Now Order Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  confirm payment
const confirmPayment = async (req, res) => {
  try {
    const { orderId, shippingAddressId, paymentMethod } = req.body;
    const { userId } = req.user;

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
      status: "Pending",
      orderStatus: "Pending",
    });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or already processed" });
    }

    const shippingAddress = await Address.findOne({
      _id: shippingAddressId,
      userId: userId,
    });
    if (!shippingAddress) {
      return res.status(404).json({ message: "Shipping address not found" });
    }

    const validPaymentMethods = [
      "Cash on Delivery",
      "Credit Card",
      "Debit Card",
      "UPI",
    ];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    order.shippingAddress = shippingAddress._id;
    order.paymentMethod = paymentMethod;
    order.paymentStatus = "Completed";
    order.orderStatus = "Completed";

    await order.save();

    res.status(200).json({
      message: "Order payment confirmed successfully",
      order,
    });
  } catch (error) {
    console.error("Payment Confirmation Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST Product review

const postReview = async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;
  const { userId } = req.user;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create a new review
    const newReview = new Review({
      productId,
      userId,
      rating,
      comment,
    });

    // Save the review to the database
    await newReview.save();

    res.status(201).json({
      message: "Review submitted successfully",
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit review", error });
  }
};

const applyCoupon = async (req, res) => {
  try {
    const { orderId, couponCode } = req.body;

    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Populate the items with their corresponding product details
    await order.populate("items.product");

    // Find the coupon (in this case represented by phoneNumber in Agent)
    const checkCouponCode = await Agent.findOne({ phoneNumber: couponCode });
    if (!checkCouponCode) {
      return res.status(404).json({ message: "Invalid coupon code" });
    }

    let totalDiscount = 0;
    let totalPrice = 0;

    // Loop through the items and calculate the discount
    order.items.forEach((item) => {
      const product = item.product;

      if (product) {
        const referralDiscount = Number(product.referralDiscount || 0); // Handle undefined values
        const price = Number(product.price);
        const itemTotalPrice = price * item.quantity;
        totalPrice += itemTotalPrice; // Sum the original total price before discount

        if (referralDiscount > 0) {
          const discount = (price * referralDiscount) / 100;
          totalDiscount += discount * item.quantity;
          item.price = price - discount; // Update the item price with the discount applied
        }
      }
    });

    // Calculate and update order's total amount after discount
    order.discountAmount = totalDiscount;
    order.totalAmount = totalPrice - totalDiscount; // Updated total amount after discount

    // Save the order with the updated discount and totalAmount
    await order.save();

    // Return success response
    res.status(200).json({
      message: "Coupon applied successfully",
      discount: totalDiscount,
      order,
    });
  } catch (error) {
    console.error("Error applying coupon:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const removeCoupon = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!order.couponCode) {
      return res
        .status(400)
        .json({ message: "No coupon applied to this order" });
    }

    let totalPrice = 0;

    order.items.forEach((item) => {
      const price = Number(item.product.normalPrice);
      totalPrice += price * item.quantity;
      item.price = price;
    });

    order.couponCode = null;
    order.discountAmount = 0;
    order.totalAmount = totalPrice;

    await order.save();

    res.status(200).json({
      message: "Coupon removed successfully",
      order,
    });
  } catch (error) {
    console.error("Error removing coupon:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  postReview,
  buyNow,
  confirmPayment,
  getBuynow,
  procedToCheckout,
  getCheckoutDetails,
  updateShippingAddress,
  confirmPaymentAndOrder,
  applyCoupon,
  removeCoupon
};
