const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Product = require("../models/Product");

const getUserFromToken = async (token) => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await User.findById(decoded.userId);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const calculateDiscountPrice = (product, isMlmAgent, category) => {
  if (category === "Crackers") {
    const discountPercentage = isMlmAgent
      ? product.mlmDiscount
      : product.normalDiscount;
    return product.price - (product.price * discountPercentage) / 100;
  }

  if (category === "Snacks") {
    const discountPercentage = isMlmAgent
      ? product.mlmDiscount
      : product.normalDiscount;

    // Map through the weight array to calculate discounted prices
    const discountedPrices = product.weight.map((item) => {
      const originalPrice = parseFloat(item.price); // Convert string to number
      const discountAmount = (originalPrice * discountPercentage) / 100;
      return originalPrice - discountAmount;
    });

    return discountedPrices; // Return an array of discounted prices
  }

  // Add a fallback if category doesn't match
  return product.price;
};

const generateSku = (productCode, variantType, variantValue) => {
  return `${productCode}-${variantType}-${variantValue}`.toUpperCase();
};

module.exports = { getUserFromToken, calculateDiscountPrice,generateSku };
