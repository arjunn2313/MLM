 
const cart = require("../../controllers/ecommerce/cart.controller")

const router = require("express").Router();

// CREATE
router.post("/add",cart.addToCart);
// GET CART ITEMS
router.get("/get-items",cart.getCartItems);
router.put("/update",cart.updateCart);

// router.post("/remove", removeFromCart);
// router.post("/apply-coupon", applyCoupon);
// router.post("/remove-coupon", removeCoupon);

module.exports = router;
