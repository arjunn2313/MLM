const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Product = require("../models/Product");
const Wishlist = require("../models/Wishlist");

// CHECK TOKEN TO FIND ISMLM AGENT
const getUserFromToken = async (token) => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await User.findById(decoded.userId);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

// APPLY ACTUAL PRICE AND DISCOUNT PRICE
const calculateWeights = (weights, product, isMlmAgent) => {
  if (product.category === "Crackers") {
    const price = product.price;
    const discountPrice = isMlmAgent
      ? product.mlmPrice || price
      : product.normalPrice || price;

    return {
      actualPrice: parseFloat(price).toFixed(2),
      discountPrice: parseFloat(discountPrice).toFixed(2),
    };
  } else if (product.category === "Snacks") {
    return weights.map((weight) => {
      const price = weight.price;
      const discountPrice = isMlmAgent
        ? weight.mlmPrice || price
        : weight.normalPrice || price;

      return {
        value: weight.value,
        unit: weight.unit,
        actualPrice: parseFloat(price).toFixed(2),
        discountPrice: parseFloat(discountPrice).toFixed(2),
      };
    });
  }

  const price = product.price;
  const discountPrice =
    price -
    (isMlmAgent ? product.mlmDiscount || 0 : product.normalDiscount || 0);

  return {
    actualPrice: parseFloat(price).toFixed(2),
    discountPrice: parseFloat(discountPrice).toFixed(2),
  };
};

// Helper function to check wishlist items
const getWishlistItems = async (userId) => {
  const wishlist = await Wishlist.findOne({ userId }).lean();
  return wishlist
    ? wishlist.items.map((item) => item.productId.toString())
    : [];
};

// QUERY BUILDER FOR FILTERING PRODUCTS
const buildQuery = (queryParams) => {
  const { category, search, productCategory, minPrice, maxPrice } = queryParams;

  let query = {
    category: { $in: ["Crackers", "Snacks"] },
  };

  if (search) {
    query.$or = [
      { productName: { $regex: search, $options: "i" } },
      { productCode: { $regex: search, $options: "i" } },
    ];
  }

  if (category) query.category = category;
  if (productCategory) query.productCategory = productCategory;

  if (minPrice || maxPrice) {
    query.price = {};

    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }

  console.log(query);

  return query;
};

module.exports = { getUserFromToken, calculateWeights, getWishlistItems,buildQuery };
