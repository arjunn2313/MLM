const { getAllOrders, getSingleOrder, dispatchOrder, getAllProductReview, approveOrRejectReview } = require("../../controllers/Admin/orders");

const router = require("express").Router();

router.get("/",getAllOrders)
router.get("/details/:orderId",getSingleOrder)
router.put("/dispatch/:orderId",dispatchOrder)
// product reviews
router.get("/review",getAllProductReview)
router.put("/review/:id",approveOrRejectReview)
module.exports = router