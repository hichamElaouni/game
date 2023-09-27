"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("MessageUsers", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER(11),
      },

      state: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
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
      idMessage: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
        references: {
          model: {
            tableName: "Messages",
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
