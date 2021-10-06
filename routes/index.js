const router = require("express").Router();

const transactionRoutes = require("./transactionsRoutes");
const errorHandler = require("../middlewares/errorHandler");

router.use("/transactions", transactionRoutes);
router.use(errorHandler);

module.exports = router;
