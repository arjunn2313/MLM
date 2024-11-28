const moment = require("moment");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const { getDateRange, formatSalesData } = require("../../services/filter");

const totalSales = async (req, res) => {
  try {
    const { category, interval } = req.query;

    if (!category || !interval) {
      return res
        .status(400)
        .json({ error: "Category and interval are required" });
    }

    const { startDate, dateFormat, fullRange } = getDateRange(interval);

    const salesData = await Order.aggregate([
      {
        $match: {
          "items.productId": {
            $in: await Product.find({ category }).distinct("_id"),
          },
          createdAt: { $gte: startDate },
        },
      },
      { $unwind: "$items" },
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: "$createdAt" } },
          totalAmount: {
            $sum: {
              $multiply: ["$items.quantity", "$items.price"],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedData = formatSalesData(salesData, interval, fullRange);

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const totalSalesBySubcategory = async (req, res) => {
  try {
    const { interval, category } = req.query;

    const { startDate } = getDateRange(interval);
    console.log("Start Date:", startDate);

    const productFilter = category ? { category } : {};
    console.log("Category Filter:", productFilter);

    const productIds = await Product.find(productFilter).distinct("_id");
    console.log("Product IDs:", productIds);

    if (!productIds.length) {
      return res
        .status(404)
        .json({ error: "No products found for the category" });
    }

    const testOrders = await Order.find({
      createdAt: { $gte: startDate },
      "items.product": { $in: productIds },
    });
    console.log("Orders matching product IDs and date:", testOrders);

    const salesData = await Order.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $match: {
          "productDetails._id": { $in: productIds },
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: "$productDetails.productCategory",
          totalAmount: {
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          },
        },
      },
      { $sort: { totalAmount: -1 } },
    ]);

    console.log("Aggregated Sales Data:", salesData);

    const formattedData = salesData.map((data) => ({
      name: data._id || "Unknown",
      value: data.totalAmount,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching subcategory sales:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSalesByCategory = async (req, res) => {
  try {
    const { category, interval } = req.query;
    let startDate, endDate;

    switch (interval) {
      case "week":
        startDate = moment().startOf("week").toDate();
        endDate = moment().endOf("week").toDate();
        break;
      case "month":
        startDate = moment().startOf("month").toDate();
        endDate = moment().endOf("month").toDate();
        break;
      case "year":
        startDate = moment().startOf("year").toDate();
        endDate = moment().endOf("year").toDate();
        break;
      default:
        return res.status(400).json({ error: "Invalid interval" });
    }

    const products = await Product.find({ category });

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the specified category" });
    }

    const productIds = products.map((product) => product._id);
    const validProductCategories = products.map(
      (product) => product.productCategory
    );

    const salesData = await Order.aggregate([
      {
        $match: {
          "items.productId": { $in: productIds },
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $match: {
          "items.productId": { $in: productIds },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $match: {
          "productDetails.productCategory": { $in: validProductCategories },
        },
      },
      {
        $group: {
          _id: "$productDetails.productCategory",
          totalSales: { $sum: "$items.totalPrice" },
        },
      },
    ]);

    const formattedData = salesData.map((sale) => ({
      productCategory: sale._id,
      totalSales: sale.totalSales,
    }));

    if (formattedData.length === 0) {
      return res.status(404).json({
        message: "No sales found for the specified category and interval",
      });
    }

    // Return the sales data grouped by productCategory
    res.status(200).json({ category, interval, salesData: formattedData });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { totalSales, totalSalesBySubcategory, getSalesByCategory };
