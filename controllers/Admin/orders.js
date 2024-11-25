const Order = require("../../models/Order");
const Review = require("../../models/Review");

// get all
const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", date, orderStatus, category } = req.query;

    const skip = (page - 1) * limit;

    // Construct basic search query
    const searchQuery = search
      ? {
          $or: [
            { orderId: { $regex: search, $options: "i" } },
            { "user.firstName": { $regex: search, $options: "i" } },
            { "user.lastName": { $regex: search, $options: "i" } },
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

    if (orderStatus) {
      searchQuery.orderStatus = orderStatus;
    }

    // Fetch orders with basic search query
    let orders = await Order.find(searchQuery)
      .populate("user", "firstName lastName")
      .populate("items.product", "category") // Populate product to access category
      .populate("shippingAddress")
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    // If category is provided, filter orders by category in memory after populating products
    if (category) {
      orders = orders.filter(order => 
        order.items.some(item => item.product.category === category)
      );
    }

    // Get total order count with search filters applied
    const totalOrders = await Order.countDocuments(searchQuery);

    // Respond with paginated order data
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



// const getAllOrders = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search = "", date, orderStatus,category } = req.query;

//     const skip = (page - 1) * limit;

//     // Construct search query
//     const searchQuery = search
//       ? {
//           $or: [
//             { orderId: { $regex: search, $options: "i" } },
//             { "user.firstName": { $regex: search, $options: "i" } },
//             { "user.lastName": { $regex: search, $options: "i" } },
//           ],
//         }
//       : {};

//     if (date) {
//       const startDate = new Date(date);
//       const endDate = new Date(date);
//       endDate.setUTCHours(23, 59, 59, 999);

//       searchQuery.createdAt = {
//         $gte: startDate,
//         $lte: endDate,
//       };
//     }

//     if (orderStatus) {
//       searchQuery.orderStatus = orderStatus;
//     }

//     const orders = await Order.find(searchQuery)
//       .populate("user", "firstName lastName")
//       .populate("shippingAddress")
//       .limit(parseInt(limit))
//       .skip(parseInt(skip))
//       .sort({ createdAt: -1 });

//     // Get total order count with search and date filters applied
//     const totalOrders = await Order.countDocuments(searchQuery);

//     res.status(200).json({
//       orders,
//       currentPage: parseInt(page),
//       totalPages: Math.ceil(totalOrders / limit),
//       totalOrders,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

 
// GET SINGLE ORDER
const getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order by ID and populate the relevant fields
    const order = await Order.findById(orderId)
      .populate("user", "firstName lastName phoneNumber email")
      .populate("shippingAddress")
      .populate(
        "items.product",
        "productName productCode category productCategory"
      );

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
      .populate("productId", "category");

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
