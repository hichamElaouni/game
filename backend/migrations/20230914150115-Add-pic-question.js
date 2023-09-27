"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("questions", "picture", {
      type: Sequelize.BOOLEAN, // You can adjust the data type as needed
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("questions", "picture");
  },
};
