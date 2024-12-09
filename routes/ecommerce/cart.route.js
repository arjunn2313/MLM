 
const cart = require("../../controllers/ecommerce/cart.controller")

const router = require("express").Router();

// CREATE (ADD TO CART)
router.post("/add",cart.addToCart);
// ADD mANY
router.post("/add-many",cart.addManyToCart);
// GET CART ITEMS
router.get("/get-items",cart.getAllCartItems);
// UPDATE (Quantity from cart)
router.post("/update",cart.updateItemQuantity);
// REMOVE PRODUCT FROM CART
router.post("/remove",cart.removeFromCart);
// APPLY COUPON CODE
router.post("/apply-coupon",cart.applyCoupon);
// REMOVE COUPON CODE
router.post("/remove-coupon",cart.removeCoupon);

module.exports = router;
