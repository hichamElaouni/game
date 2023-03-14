'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Role", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,

        type: Sequelize.INTEGER(11),
      },
      name: {
        type: Sequelize.STRING
      },
      date_added: {
        type: Sequelize.INTEGER(11)
      },
      last_modified: {
        type: Sequelize.INTEGER(11)
      },
    })
    await queryInterface.bulkInsert('Role', [{
      name: 'admin',
      date_added: 0,
      last_modified: 0,

    }, {
      name: 'Student',
      date_added: 0,
      last_modified: 0,

    }], {});

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
