const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Review = require("../../models/Review");

// GET ALL

const getAllOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      date,
      orderStatus,
      category,
      paymentStatus,
      paymentMethod,
      couponCode,
    } = req.query;

    const skip = (page - 1) * limit;

    const searchQuery = search
      ? {
          $or: [
            { orderId: { $regex: search, $options: "i" } },
            { "user.firstName": { $regex: search, $options: "i" } },
            { "user.lastName": { $regex: search, $options: "i" } },
            { "guestInfo.name": { $regex: search, $options: "i" } },
            { "guestInfo.email": { $regex: search, $options: "i" } },
          ],
        }
      : {};

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setUTCHours(23, 59, 59, 999);

      searchQuery.createdAt = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    if (orderStatus) searchQuery.orderStatus = orderStatus;
    if (paymentStatus) searchQuery.paymentStatus = paymentStatus;
    if (paymentMethod) searchQuery.paymentMethod = paymentMethod;
    if (couponCode) searchQuery.couponCode = couponCode;

    let orders = await Order.find(searchQuery)
      .populate("user", "firstName lastName")
      .populate("items.productId", "category")
      .populate("items.variantId", "variantSku")
      .populate("shippingAddress")
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    if (category) {
      orders = orders
        .map((order) => {
          const filteredItems = order.items.filter(
            (item) => item.productId.category === category
          );
          return filteredItems.length > 0
            ? { ...order.toObject(), items: filteredItems }
            : null;
        })
        .filter((order) => order !== null);
    }

    const totalOrders = await Order.countDocuments(searchQuery);

    res.status(200).json({
      orders,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// GET SINGLE ORDER
const getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate("user", "firstName lastName phoneNumber email")
      .populate("shippingAddress")
      .populate("items.productId", "productName productCode category ")
      .populate("items.variantId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// DISPATCH ORDER
const dispatchOrder = async (req, res) => {
  const { deliveryPartner, trackingId, trackingLink, status } = req.body;
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (deliveryPartner) order.deliveryPartner = deliveryPartner;
    if (trackingId) order.trackingId = trackingId;
    if (trackingLink) order.trackingLink = trackingLink;

    order.status = "Dispatched";

    // Save the updated order
    const updatedOrder = await order.save();

    res
      .status(200)
      .json({ message: "Order updated successfully", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// get all product review
const getAllProductReview = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "name")
      .populate("productId", "category")
      .sort({ createdAt: -1 });
      

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this product" });
    }

    // Send the reviews in the response
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

// Approve or reject review
const approveOrRejectReview = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (status === "approved" || status === "rejected") {
      const productId = updatedReview.productId;

      const approvedReviews = await Review.find({
        productId,
        status: "approved",
      });

      const reviewCount = approvedReviews.length;
      const totalRating = approvedReviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

      await Product.findByIdAndUpdate(productId, {
        reviewCount,
        averageRating,
      });
    }

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Failed to update review status" });
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  dispatchOrder,
  getAllProductReview,
  approveOrRejectReview,
};
