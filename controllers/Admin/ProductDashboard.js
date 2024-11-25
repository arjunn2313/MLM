const Order = require("../../models/Order");
const Product = require("../../models/Product");
const { getDateRange, formatSalesData } = require("../../services/filter");

const totalSales = async (req, res) => {
  try {
    const { category, interval } = req.query;

    if (!category || !interval) {
      return res.status(400).json({ error: "Category and interval are required" });
    }

    const { startDate, dateFormat, fullRange } = getDateRange(interval);

    const salesData = await Order.aggregate([
      {
        $match: {
          "items.product": {
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
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Format the sales data, ensuring all weeks or months are included
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

    const { startDate, dateFormat } = getDateRange(interval);

    const productFilter = category ? { category } : {};

    const productIds = await Product.find(productFilter).distinct("_id");

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

    const formattedData = salesData.map((data) => ({
      name: data._id,
      value: data.totalAmount,
    }));

    // Send the response
    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching subcategory sales:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { totalSales, totalSalesBySubcategory };
