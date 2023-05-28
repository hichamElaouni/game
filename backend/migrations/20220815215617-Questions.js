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
      image: {
        type: Sequelize.STRING,
        defaultValue: 'noImage',
      },
      choices: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      answer: {
        type: Sequelize.INTEGER(11),
        allowNull: false,

        defaultValue: 1,
      },
      point: {
        type: Sequelize.INTEGER(11),
        defaultValue: 1,
      },

      idSubject: {
        type: Sequelize.INTEGER(11),
        references: {
          model: {
            tableName: "Subjects",
          },
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },

      idLevel: {

        type: Sequelize.INTEGER(11),
        references: {
          model: {
            tableName: "Levels",
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
