const { earningHistory } = require("../../controllers/Agent/EarningHistory");

const router = require("express").Router();

router.get("/",earningHistory)

module.exports = router