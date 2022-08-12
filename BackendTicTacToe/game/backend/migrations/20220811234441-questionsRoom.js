"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("questionsRoom", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },

      idRoom: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
        defaultValue: 1,
        references: {
          model: {
            tableName: "rooms",
          },
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      idQuestion: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
        references: {
          model: {
            tableName: "questions",
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
