const router = require("express").Router();

const Controller = require("../controllers/transactionController");

router.get("/", Controller.getAll);
router.post("/:itemId");
router.get("/:id");
router.put("/:id");
router.patch("/:id");
router.get("/:id");

module.exports = router;
