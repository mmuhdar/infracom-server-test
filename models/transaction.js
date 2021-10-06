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
      transaction_code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Transaction code required",
          },
          notNull: {
            msg: "Transaction code cannot be null",
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
      status: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "status required",
          },
          isAlpha: {
            msg: "Input must be string",
          },
        },
      },
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
