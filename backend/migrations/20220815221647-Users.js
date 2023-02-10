"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      classUser: {
        type: Sequelize.STRING,
      },
      telephone: {
        type: Sequelize.STRING,
      },
      dateBorn: {
        type: Sequelize.STRING,
      },
      point: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0,
      },
      victories: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0,
      },
      losses: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0,
      },
      adress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image: {

        type: Sequelize.STRING,
        defaultValue: "https://manager.almadarisp.com/user/img/user.png"
      },
      roles: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "student"
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
