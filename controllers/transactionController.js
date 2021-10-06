const { Transaction } = require("../models");

class Controller {
  static async getAll(_, res, next) {
    try {
      const data = await Transaction.getAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
