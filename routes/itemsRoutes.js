const router = require("express").Router();

const Controller = require("../controllers/itemController");

router.get("/", Controller.getAll);

module.exports = router;
