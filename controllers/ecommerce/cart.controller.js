const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const User = require("../../models/User");
const Variant = require("../../models/Varient");
const Agent = require("../../models/agents");
const { STATUS_CODES, MESSAGES } = require("../../utils/constants");
const createError = require("../../utils/createError");

// ADD TO CART
exports.addToCart = async (req, res, next) => {
  const { productId, variantSku, quantity, variantId } = req.body;
  const { userId } = req.user;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return next(
        createError(STATUS_CODES.NOT_FOUND, MESSAGES.PRODUCT.NOT_FOUND)
      );
    }

    // Find the variant by sku
    const variant = await Variant.findOne({
      productId,
      "variants.sku": variantSku,
    });
    if (!variant) {
      return next(createError(STATUS_CODES.NOT_FOUND, "Varient not found"));
    }

    const selectedVariant = variant.variants.find((v) => v.sku === variantSku);

    const user = await User.findById(userId);
    if (!user) {
      return next(createError(STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND));
    }

    const isMlmUser = user.isMlmAgent;
    const price = isMlmUser
      ? selectedVariant.mlmPrice
      : selectedVariant.normalPrice;
    const totalPrice = price * quantity;

    let cart = await Cart.findOne({ userId, status: "active" });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            productId,
            variantSku,
            quantity,
            price,
            totalPrice,
            variantId,
          },
        ],
        totalAmount: totalPrice,
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.variantSku === variantSku
      );

      if (existingItemIndex >= 0) {
        cart.items[existingItemIndex].quantity += quantity;
        cart.items[existingItemIndex].totalPrice =
          cart.items[existingItemIndex].quantity * price;
      } else {
        cart.items.push({
          productId,
          variantSku,
          quantity,
          price,
          totalPrice,
        });
      }

      cart.totalAmount = cart.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    }

    await cart.save();
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "Item added to cart", cart });
  } catch (err) {
    next(err);
  }
};
// GET ALL CART ITEMS
exports.getAllCartItems = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const cart = await Cart.findOne({ userId, status: "active" });

    if (!cart) {
      return next(createError(STATUS_CODES.NOT_FOUND, "CART NOT FOUND"));
    }

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "Cart items fetched successfully", items: cart });
  } catch (err) {
    console.log(err);
  }
};
// UPADTE QUANTITY
exports.updateItemQuantity = async (req, res, next) => {
  const { productId, variantSku, quantity } = req.body;
  const { userId } = req.user;

  try {
    const cart = await Cart.findOne({ userId, status: "active" });

    if (!cart) {
      return next(createError(STATUS_CODES.NOT_FOUND, "CART NOT FOUND"));
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.variantSku === variantSku
    );

    if (itemIndex === -1) {
      return next(
        createError(STATUS_CODES.NOT_FOUND, "Items not foun in cart")
      );
    }

    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].totalPrice =
      cart.items[itemIndex].quantity * cart.items[itemIndex].price;

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    await cart.save();
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "Item quantity updated", cart });
  } catch (err) {
    next(err);
  }
};
// Remove ITEM FROM CART
exports.removeFromCart = async (req, res, next) => {
  const { productId, variantId } = req.body;

  const { userId } = req.user;

  try {
    const cart = await Cart.findOne({ userId, status: "active" });

    if (!cart) {
      return next(createError(STATUS_CODES.NOT_FOUND, "CART NOT FOUND"));
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.variantId?.toString() === variantId
    );

    if (itemIndex === -1) {
      return next(
        createError(STATUS_CODES.NOT_FOUND, "Item not found in cart")
      );
    }

    cart.items.splice(itemIndex, 1);

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    await cart.save();
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "Item removed from cart", cart });
  } catch (err) {
    next(err);
  }
};
// APPLY COUPON
exports.applyCoupon = async (req, res, next) => {
  const { couponCode } = req.body;
  const { userId } = req.user;

  try {
    const user = await User.findById(userId);
    if (user.isMlmAgent) {
      return next(
        createError(STATUS_CODES.BAD_REQUEST, "You can't apply coupon code")
      );
    }

    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) {
      return next(createError(STATUS_CODES.NOT_FOUND, "CART NO FOUND"));
    }

    const validCoupon = await Agent.findOne({ phoneNumber: couponCode });
    if (!validCoupon) {
      return next(createError(STATUS_CODES.BAD_REQUEST, "Invalid Coupon code"));
    }

    let discountAmount = 0;
    for (let item of cart.items) {
      const product = await Variant.findById(item.variantId);
      if (product) {
        const variant = product.variants.find(
          (variant) => variant.sku === item.variantSku
        );

        if (variant && variant.referralPrice) {
          item.price = variant.referralPrice;
          item.totalPrice = item.price * item.quantity;

          discountAmount +=
            item.quantity * variant.normalPrice - item.totalPrice;
        }
      }
    }

    cart.discount = discountAmount;
    cart.totalAmount -= discountAmount;
    cart.couponCode = couponCode;

    await cart.save();
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "Coupon applied successfully", cart });
  } catch (err) {
    next(err);
  }
};
// REMOVE COUPON
exports.removeCoupon = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) {
      return next(createError(STATUS_CODES.NOT_FOUND, "Cart not found"));
    }

    if (!cart.discount || cart.discount === 0) {
      return next(createError(STATUS_CODES.BAD_REQUEST, "No coupon applied"));
    }

    let restoredTotal = 0;

    for (let item of cart.items) {
      const product = await Variant.findById(item.variantId);
      if (product) {
        const variant = product.variants.find(
          (variant) => variant.sku === item.variantSku
        );

        if (variant && variant.referralPrice) {
          item.price = variant.normalPrice;
          item.totalPrice = item.price * item.quantity;
        }
      }

      restoredTotal += item.totalPrice;
    }

    cart.discount = 0;
    cart.totalAmount = restoredTotal;
    cart.couponCode = null;

    await cart.save();
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "Coupon removed successfully", cart });
  } catch (err) {
    next(err);
  }
};
// Checkout cart (finalize order)
exports.checkoutCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId, status: "active" });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Change the cart status to 'completed'
    cart.status = "completed";
    await cart.save();

    res.status(200).json({ message: "Checkout completed successfully", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
