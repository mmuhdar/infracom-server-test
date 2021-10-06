const { Transaction } = require("../models");

class Controller {
  static async getAll(_, res, next) {
    try {
      const data = await Transaction.getAll();
      throw { name: "NotFound" };
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
