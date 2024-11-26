const {
  placeOrder,
  getOrders,
  postReview,
  buyNow,
  confirmPayment,
  getBuynow,
  procedToCheckout,
  getCheckoutDetails,
  updateShippingAddress,

  applyCoupon,
} = require("../../controllers/Ecommerce/Order");

const router = require("express").Router();

// new apis
router.post("/checkout", procedToCheckout);
router.get("/checkout/:orderId", getCheckoutDetails);
router.post("/checkout/update", updateShippingAddress);
router.post("/checkout/confirm-payment", confirmPayment);
router.post("/apply-coupon", applyCoupon);

// old apis
router.post("/create", placeOrder);
// Direct buy
router.post("/buynow", buyNow);
router.post("/buynow/confirm-payment", confirmPayment);
router.get("/buynow/:orderId", getBuynow);
router.get("/", getOrders);
router.post("/review/:productId", postReview);
router.post("/apply-coupon",applyCoupon)

module.exports = router;
