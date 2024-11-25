const { userTree } = require("../../controllers/Agent/Tree");

const router = require("express").Router();

router.get("/",userTree)

module.exports = router