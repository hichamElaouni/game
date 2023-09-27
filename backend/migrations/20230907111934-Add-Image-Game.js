"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("games", "image", {
      type: Sequelize.STRING, // You can adjust the data type as needed
      defaultValue:
        "https://pngtree.com/freepng/game-zone-for-neon_6010688.html",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("games", "image");
  },
};
