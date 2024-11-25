const router = require("express").Router();
const UserRoute = require("./user.route");
const ProductRoute = require("./product.route");
const CartRoute = require("./cart.route");
const { authenticateToken } = require("../../utils/jwt");

router.use("/user",UserRoute);
router.use('/product',ProductRoute)
router.use('/cart',authenticateToken,CartRoute)

module.exports = router;
