const router = require("express").Router();
const UserRoute = require("./Register")
const dashboardRoute = require("./User")
const earningRoute = require("./ExpenseHistory")
const treeRoute = require("./Tree")
 

router.use("/", UserRoute);
router.use("/dashboard",dashboardRoute);
router.use("/earning",earningRoute);
router.use("/tree", treeRoute);

module.exports = router;
