'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Roles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })


    await queryInterface.bulkInsert('Roles', [{
      id: 1,
      name: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()

    }, {
      id: 2,
      name: 'Teacher',
      createdAt: new Date(),
      updatedAt: new Date()
    }
      , {
      id: 3,
      name: 'Student',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
