"use strict";
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const newData = data.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Items", newData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Items", null, {});
  },
};
