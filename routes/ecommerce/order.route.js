 const router = require("express").Router();
const order = require("../../controllers/ecommerce/order.controllers")

// // new apis
// router.post("/checkout", procedToCheckout);
// router.get("/checkout/:orderId", getCheckoutDetails);
// router.post("/checkout/update", updateShippingAddress);
// router.post("/checkout/confirm-payment", confirmPayment);
// router.post("/apply-coupon", applyCoupon);

// // old apis
// router.post("/create", placeOrder);
// // Direct buy
// router.post("/buynow", buyNow);
// router.post("/buynow/confirm-payment", confirmPayment);
// router.get("/buynow/:orderId", getBuynow);
// router.get("/", getOrders);
// router.post("/review/:productId", postReview);
// router.post("/apply-coupon",applyCoupon)

router.post("/",order.createOrder)
router.get("/pending-order",order.getUserPendingOrder)
router.post("/confirm-order", order.confirmOrder);
router.get("/", order.getUserOrders);
router.post("/review", order.createReview);


module.exports = router;
