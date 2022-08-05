"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      nameRoom: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      token: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      idGame: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
        defaultValue: 1,
        references: {
          model: {
            tableName: "games",
          },
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      point: {
        type: Sequelize.INTEGER(11),
        defaultValue: 5,
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
