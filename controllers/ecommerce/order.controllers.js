const Address = require("../../models/Address");
const Cart = require("../../models/Cart");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Review = require("../../models/Review");

const generateOrderId = () => {
  const timestamp = Date.now().toString();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();
  return `ORD-${timestamp}-${randomSuffix}`;
};

// CREATE ORDER INSTANCE
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod = "Cash on Delivery" } = req.body;
    const { userId } = req.user;

    // Validate shipping address
    if (!shippingAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Shipping address is required." });
    }

    const isAddress = await Address.findOne({ userId, _id: shippingAddress });
    if (!isAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid shipping address." });
    }

    // Fetch user's cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Cart is empty." });
    }

    // Generate unique order ID
    const orderId = generateOrderId();

    // Prepare order data
    const orderData = {
      user: userId,
      orderId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        variantId: item.variantId,
        variantSku: item.variantSku,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice,
      })),
      totalAmount: cart.totalAmount,
      discountAmount: cart.discount || 0,
      couponCode: cart.couponCode || null,
      taxAmount: 0,
      shippingAddress: isAddress._id,
      paymentMethod,
      paymentStatus: "Pending",
      orderStatus: "Pending",
    };

    const order = await Order.create(orderData);

    cart.items = [];
    cart.couponCode = null;
    cart.discount = 0;
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// CONFIRM PAYMENT
exports.confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const { userId } = req.user;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required.",
      });
    }

    const order = await Order.findOne({
      orderId,
      user: userId,
      orderStatus: "Pending",
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (
      order.orderStatus === "Dispatched" ||
      order.orderStatus === "Delivered"
    ) {
      return res.status(400).json({
        success: false,
        message: "Order is already confirmed or completed.",
      });
    }

    order.orderStatus = "Confirmed";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed successfully.",
      order,
    });
  } catch (error) {
    console.error("Error confirming order:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
// GET PENDING ORDER
exports.getUserPendingOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { orderId } = req.body;

    const pendingOrders = await Order.findOne({
      orderId,
      user: userId,
      orderStatus: "Pending",
    });

    if (!pendingOrders) {
      return res.status(404).json({
        success: false,
        message: "No pending orders found.",
      });
    }

    res.status(200).json({
      success: true,
      pendingOrders,
    });
  } catch (error) {
    console.error("Error retrieving pending orders:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// GET ALL ORDERS
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.user;

    const orders = await Order.find({
      user: userId,
      orderStatus: { $ne: "Pending" },
    });

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found.",
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error retrieving user orders:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// POST REVIEW
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const { userId } = req.user;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const newReview = new Review({
      productId,
      userId,
      rating,
      comment,
      status: "pending",
    });

    const savedReview = await newReview.save();

    res.status(201).json({
      success: true,
      message: "Review posted successfully",
      review: savedReview,
    });
  } catch (error) {
    console.error("Error posting review:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
