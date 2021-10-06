const router = require("express").Router();

const transactionRoutes = require("./transactionsRoutes");
const itemRoutes = require("./itemsRoutes");
const errorHandler = require("../middlewares/errorHandler");

router.use("/items", itemRoutes);
router.use("/transactions", transactionRoutes);
router.use(errorHandler);

module.exports = router;
