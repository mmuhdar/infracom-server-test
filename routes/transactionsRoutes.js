const router = require("express").Router();

const Controller = require("../controllers/transactionController");

router.get("/", Controller.getAll);
router.post("/:itemId", Controller.create);
router.get("/:id", Controller.findOne);
router.patch("/:id", Controller.update);
router.delete("/:id", Controller.delete);

module.exports = router;
