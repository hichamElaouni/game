"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Games", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      nameGame: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      typeGame: {
        type: Sequelize.INTEGER(11),
        defaultValue: 2,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.bulkInsert('Games', [{
      nameGame: 'Tic Tac Toe',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },


  async down(queryInterface, Sequelize) {


    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
