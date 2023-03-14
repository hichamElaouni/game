'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('Role', 'createdAt', {
      type: Sequelize.STRING,
      defaultValue: 0
    });
    await queryInterface.addColumn('Role', 'updatedAt', {
      type: Sequelize.STRING,
      defaultValue: 0
    });



  },





  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('Role', 'createdAt');
    await queryInterface.removeColumn('Role', 'updatedAt');

  }
};