const router = require("express").Router();

const transactionRoutes = require("./transactionsRoutes");

router.use("/transactions", transactionRoutes);

module.exports = router;
