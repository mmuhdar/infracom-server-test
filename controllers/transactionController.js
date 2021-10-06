const short = require("short-uuid");
const { Transaction, Item } = require("../models");

class Controller {
  static async getAll(_, res, next) {
    try {
      const data = await Transaction.findAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async create(req, res, next) {
    try {
      const { itemId } = req.params;
      const { amount } = req.body;

      const checkItem = await Item.findByPk(itemId);
      if (!checkItem) {
        throw { name: "NotFound" };
      } else {
        const response = await Transaction.create({
          transaction_code: short.generate(),
          amount: amount,
          price: checkItem.price * amount,
          ItemId: itemId,
        });
        await Item.update(
          {
            ...checkItem,
            stock: checkItem.stock - amount,
          },
          { where: { id: itemId } }
        );
        res.status(201).json(response);
      }
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Transaction.findByPk(id);
      if (!response) {
        throw { name: "NotFound" };
      } else {
        res.status(200).json(response);
      }
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const checkData = await Transaction.findByPk(id);
      if (!checkData) {
        throw { name: "NotFound" };
      } else {
        await Transaction.update({ status }, { where: { id } });
        res.status(200).json({ message: "Success update data" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const checkData = await Transaction.findByPk(id);
      if (!checkData) {
        throw { name: "NotFound" };
      } else {
        const dataItem = await Item.findByPk(checkData.ItemId);
        await Item.update(
          {
            ...checkData,
            stock: checkData.amount + dataItem.stock,
          },
          { where: { id: checkData.ItemId } }
        );

        await Transaction.destroy({ where: { id } });
        res.status(200).json({ message: "Success delete data" });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
