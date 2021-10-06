"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Item);
    }
  }
  Transaction.init(
    {
      invoice: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Invoice required",
          },
          notNull: {
            msg: "Input cannot be null",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price required",
          },
          notNull: {
            msg: "Input cannot be null",
          },
          isNumeric: {
            msg: "Price input must be number",
          },
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Amount required",
          },
          notNull: {
            msg: "Input cannot be null",
          },
          isNumeric: {
            msg: "Amount input must be number",
          },
        },
      },
      status: DataTypes.STRING,
      ItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "ItemId required",
          },
          notNull: {
            msg: "Input cannot be null",
          },
          isNumeric: {
            msg: "ItemId must be number",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
