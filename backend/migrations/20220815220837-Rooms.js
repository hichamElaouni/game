"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("Rooms", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER(11),
      },
      nameRoom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Point: {
        type: Sequelize.INTEGER(11),
        defaultValue: 2,
      },
      TimeTurn: {
        type: Sequelize.INTEGER(11),
        defaultValue: 15,
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
