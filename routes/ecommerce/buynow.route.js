const router = require("express").Router();
const buyNow = require("../../controllers/ecommerce/buynow.controller")

router.post("/",buyNow.buyNow)

module.exports = router;
