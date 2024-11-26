const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Variant = require("../../models/Varient");
const { getUserFromToken } = require("../../services/productService");
const { STATUS_CODES, MESSAGES } = require("../../utils/constants");
const { v4: uuidv4 } = require("uuid");

const generateOrderId = () => {
  const timestamp = Date.now().toString();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();
  return `ORD-${timestamp}-${randomSuffix}`;
};

// CREATE ORDER INSTANCE
exports.buyNow = async (req, res, next) => {
  try {
    const { productId, variantId, variantSku, quantity } = req.body;
    const token = req.cookies.token;
    let user = null;

    if (token) {
      user = await getUserFromToken(token);
    }

    const product = await Product.findById(productId);

    if (!product) {
      return next(
        createError(STATUS_CODES.NOT_FOUND, MESSAGES.Product.NOT_FOUND)
      );
    }

    const variant = await Variant.findOne({
      productId,
      "variants.sku": variantSku,
    });
    if (!variant) {
      return next(createError(STATUS_CODES.NOT_FOUND, "Variant not found"));
    }

    const selectedVariant = variant.variants.find((v) => v.sku === variantSku);

    const isMlmUser = user?.isMlmAgent || false;
    const price = isMlmUser
      ? selectedVariant.mlmPrice
      : selectedVariant.normalPrice;
    const totalPrice = price * quantity;

    const orderId = generateOrderId();

    const guestId = user ? null : `GUEST-${uuidv4()}`;

    const orderInstance = new Order({
      user: user?._id || null,
      guestId,
      orderId,
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

    await orderInstance.save();
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "Order Instance Created", orderInstance });
  } catch (error) {
    next(error);
  }
};
