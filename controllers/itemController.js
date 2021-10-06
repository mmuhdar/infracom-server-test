const { Item } = require("../models");

class Controller {
  static async getAll(_, res, next) {
    try {
      const data = await Item.findAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
