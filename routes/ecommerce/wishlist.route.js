const router = require("express").Router();
const wishlist = require("../../controllers/ecommerce/wishlist.controller");

router.post("/", wishlist.addToWishlist);
router.get("/", wishlist.getAllWishlistItems);
router.delete("/", wishlist.removeFromWishlist);
router.post("/add", wishlist.removeFromCartAndAddToWishlist);

module.exports = router;
