"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("QuestionsHistory", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      idQuestion: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
        references: {
          model: {
            tableName: "Questions",
          },
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      idRoomHistory: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
        references: {
          model: {
            tableName: "RoomHistory",
          },
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      selectedAnswer: {
        type: Sequelize.INTEGER(11),
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
