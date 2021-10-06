"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Items", "imageURL", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Items", "imageURL", {});
  },
};
