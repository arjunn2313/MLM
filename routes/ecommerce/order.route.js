const router = require("express").Router();
const order = require("../../controllers/ecommerce/order.controllers");

router.post("/", order.createOrder);
router.get("/pending-order", order.getUserPendingOrder);
router.post("/confirm-order", order.confirmOrder);
router.get("/", order.getUserOrders);
router.post("/review", order.createReview);

module.exports = router;
