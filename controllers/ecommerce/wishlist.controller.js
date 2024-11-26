const Wishlist = require("../../models/Wishlist");
const Product = require("../../models/Product");
const Cart = require("../../models/Cart");

// ADD TO WISHLIST
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req.user;

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ error: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }

    const itemExists = wishlist.items.find(
      (item) => item.productId.toString() === productId
    );
    if (itemExists) {
      return res.status(400).json({ error: "Product already in wishlist" });
    }

    wishlist.items.push({ productId });
    await wishlist.save();

    return res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// get all items
exports.getAllWishlistItems = async (req, res) => {
  try {
    const { userId } = req.user;

    const wishlist = await Wishlist.findOne({ userId }).populate(
      "items.productId"
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    return res.status(200).json(wishlist.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// delete
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req.user;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    const itemIndex = wishlist.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Product not found in wishlist" });
    }

    wishlist.items.splice(itemIndex, 1);
    await wishlist.save();

    return res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// REMOVE FROM CART AND ADD TO WISHLIST
exports.removeFromCartAndAddToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req.user;

    // Check if the product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Remove from Cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const cartItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    cart.items.splice(cartItemIndex, 1);
    await cart.save();

    // Add to Wishlist
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }

    const wishlistItemExists = wishlist.items.find(
      (item) => item.productId.toString() === productId
    );

    if (wishlistItemExists) {
      return res.status(400).json({ error: "Product already in wishlist" });
    }

    wishlist.items.push({ productId });
    await wishlist.save();

    return res.status(200).json({
      message: "Product removed from cart and added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
