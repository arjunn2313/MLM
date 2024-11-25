const { addToWishlist, removeFromWishlist, getAllWishlistItems, removeFromCartAndAddToWishlist } = require("../../controllers/Ecommerce/Wishlist");

const router = require("express").Router();

router.post("/",addToWishlist)
router.get("/",getAllWishlistItems)
router.delete("/",removeFromWishlist)
router.post("/add", removeFromCartAndAddToWishlist);


module.exports = router;