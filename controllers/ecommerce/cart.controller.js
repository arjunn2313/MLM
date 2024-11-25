const mongoose = require("mongoose");
const User = require("../../models/User");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const Agent = require("../../models/agents");
const createError = require("../../utils/createError");
const { STATUS_CODES, MESSAGES } = require("../../utils/constants");

// ADD TO CART
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity, weightIndx } = req.body;

    const { userId } = req.user;

    if (!productId || !quantity) {
      return next(
        createError(STATUS_CODES.BAD_REQUEST, "Missing required fields")
      );
    }

    const parsedQuantity = Number(quantity);
    if (!parsedQuantity || parsedQuantity <= 0) {
      return next(createError(STATUS_CODES.BAD_REQUEST, "Invalid Quantity"));
    }

    // Fetch user and validate
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND));
    }

    // Fetch product and validate
    const product = await Product.findById(productId);
    if (!product) {
      return next(
        createError(STATUS_CODES.NOT_FOUND, MESSAGES.PRODUCT.NOT_FOUND)
      );
    }

    // Validate weight index for products with weights
    if (
      product.category === "Snacks" &&
      (!product.weight || !product.weight[weightIndx])
    ) {
      return next(
        createError(STATUS_CODES.BAD_REQUEST, "Weight index not found")
      );
    }

    // Calculate price based on user type and product category
    const isMlmUser = user.isMlmAgent;
    let price;
    if (isMlmUser) {
      price =
        product.category === "Snacks"
          ? product.weight[weightIndx].mlmPrice
          : product.mlmPrice;
    } else {
      price =
        product.category === "Snacks"
          ? product.weight[weightIndx].normalPrice
          : product.normalPrice;
    }

    // Fetch or create cart for the user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if product already exists in the cart
    const existingItemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );

    if (existingItemIndex > -1) {
      // Update existing item
      cart.items[existingItemIndex].quantity += parsedQuantity;
      cart.items[existingItemIndex].price = price;

      // Set actualPrice based on category
      if (product.category === "Snacks") {
        cart.items[existingItemIndex].actualPrice =
          product.weight[weightIndx].price;
      } else {
        cart.items[existingItemIndex].actualPrice = product.price;
      }
    } else {
      // Add new item
      cart.items.push({
        productId,
        quantity: parsedQuantity,
        price,
        actualPrice:
          product.category === "Snacks"
            ? product.weight[weightIndx].price
            : product.price,
      });
    }

    // Save cart
    await cart.save();

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "Item added to cart", cart });
  } catch (error) {
    next(error);
  }
};

// GET
exports.getCartItems = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.productId"
    );

    if (!cart) {
      return next(createError(STATUS_CODES.NOT_FOUND, "Items not found"));
    }

    res.status(STATUS_CODES.SUCCESS).json({ cart });
  } catch (error) {
    next(error);
  }
};
// Update Cart
exports.updateCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const { userId } = req.user;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return next(createError(STATUS_CODES.NOT_FOUND, "Cart not found"));
    }

    const itemIndex = cart.items.findIndex((item) =>
      new mongoose.Types.ObjectId(item.productId).equals(productId)
    );

    if (itemIndex === -1) {
      return next(
        createError(STATUS_CODES.NOT_FOUND, MESSAGES.PRODUCT.NOT_FOUND)
      );
    }

    const parsedQuantity = Number(quantity);

    if (parsedQuantity > 0) {
      cart.items[itemIndex].quantity = parsedQuantity;
      res
        .status(STATUS_CODES.SUCCESS)
        .json({ message: "Product quantity updated", cart });
    } else {
      cart.items.splice(itemIndex, 1);
      res
        .status(STATUS_CODES.SUCCESS)
        .json({ message: "Product removed from cart", cart });
    }

    await cart.save();
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req.user;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex((item) =>
      new mongoose.Types.ObjectId(item.productId).equals(productId)
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// apply coupon
const applyCoupon = async (req, res) => {
  try {
    const { couponCode } = req.body;
    const { userId } = req.user;

    const isAgent = await User.findById(userId);
    if (!isAgent) {
      return res.status(400).json({ message: "User not found" });
    }

    if (isAgent.isMlmAgent) {
      return res
        .status(400)
        .json({ message: "Coupon is not applicable for MLM users" });
    }

    const checkCoupon = await Agent.findOne({ phoneNumber: couponCode });
    if (!checkCoupon) {
      return res.status(400).json({ message: "Invalid coupon code" });
    }

    const cart = await Cart.findOne({ user: userId }).populate(
      "items.productId"
    );
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    let totalDiscount = 0;

    cart.items.forEach((item) => {
      const product = item.productId;

      if (product) {
        const referralDiscount = Number(product.referralDiscount || 0);
        const price = Number(product.price);

        if (referralDiscount > 0) {
          const discount = (price * referralDiscount) / 100;
          totalDiscount += discount * item.quantity;
          item.price = price - discount;
        }
      }
    });

    cart.couponCode = couponCode;

    await cart.save();

    return res.status(200).json({
      message: "Coupon applied successfully",
      cart,
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
    const { userId } = req.user;

    const isAgent = await User.findById(userId);
    if (!isAgent) {
      return res.status(400).json({ message: "User not found" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    await Cart.populate(cart, { path: "items.productId", model: "Product" });

    cart.couponCode = null;
    cart.discountAmount = 0;

    cart.items.forEach((item) => {
      const product = item.productId;

      if (product) {
        item.price = product.normalPrice;
        item.actualPrice = product.price;
      }
    });

    await cart.save();

    return res.status(200).json({
      message: "Coupon removed successfully",
      cart,
    });
  } catch (error) {
    console.error("Error removing coupon:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// module.exports = {
//   addToCart,
//   updateCart,
//   getCartItems,
//   removeFromCart,
//   applyCoupon,
//   removeCoupon,
// };
