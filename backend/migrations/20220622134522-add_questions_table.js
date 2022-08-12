"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("Questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      choices: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      answer: {
        type: Sequelize.INTEGER(11),
        defaultValue: 1,
      },
      point: {
        type: Sequelize.INTEGER(11),
        defaultValue: 1,
      },
      idGame: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
        defaultValue: 1,
        references: {
          model: {
            tableName: "Games",
          },
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
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
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
