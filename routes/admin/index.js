const router = require("express").Router()
const dashBoardRoute = require("./dashBoard")
const districtRoute = require("./district")
const agentRoute = require("./agent")
const settingsRoute = require("./settings")
const ProductDashboardRoute = require("./ProductDashboard")
const levelsTrackerRoute = require("./levelsTracker")
const productRoute = require("./Product")
const expenseRoute = require("./Expense")
const sectionRoute = require("./tree")
const orderRoute = require("./orders")
const HeadRoute = require("./districtHead")


router.use("/dashboard",dashBoardRoute)
router.use("/district",districtRoute)
router.use("/agent",agentRoute)
router.use("/settings",settingsRoute)
router.use("/section",sectionRoute)
router.use("/product-dashboard",ProductDashboardRoute)
router.use("/district-head",HeadRoute)
router.use("/levels-tracker",levelsTrackerRoute)
router.use("/product",productRoute)
router.use("/orders",orderRoute)
router.use("/expense",expenseRoute)


module.exports = router