"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("RoomHistory", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      idRoom: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
        references: {
          model: {
            tableName: "Rooms",
          },
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      idStudent_1: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
        references: {
          model: {
            tableName: "Students",
          },
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      idStudent_2: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
        references: {
          model: {
            tableName: "Students",
          },
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      victories: {
        type: Sequelize.INTEGER(11),
      },
      losses: {
        type: Sequelize.INTEGER(11),
      },
      roundPlay: {
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
