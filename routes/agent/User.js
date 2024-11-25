const { userDashboard } = require("../../controllers/Agent/user");

const router = require("express").Router();

router.get("/",userDashboard)

module.exports = router;