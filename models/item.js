"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.hasMany(models.Transaction);
    }
  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name required",
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
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Stock required",
          },
          notNull: {
            msg: "Input cannot be null",
          },
          isNumeric: {
            msg: "Stock input must be number",
          },
        },
      },
      imageURL: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "ImageURL required",
          },
          notNull: {
            msg: "Input cannot be null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
