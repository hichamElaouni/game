'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'classUser', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Users', 'point', {
      type: Sequelize.STRING,
      defaultValue: 0
    });
    await queryInterface.addColumn('Users', 'victories', {
      type: Sequelize.STRING,
      defaultValue: 0
    });
    await queryInterface.addColumn('Users', 'losses', {
      type: Sequelize.STRING,
      defaultValue: 0
    });
    await queryInterface.addColumn('Users', 'createdAt', {
      type: Sequelize.STRING,
      defaultValue: 0
    });
    await queryInterface.addColumn('Users', 'updatedAt', {
      type: Sequelize.STRING,
      defaultValue: 0
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'classUser');
    await queryInterface.removeColumn('Users', 'point');
    await queryInterface.removeColumn('Users', 'victories');
    await queryInterface.removeColumn('Users', 'losses');
    await queryInterface.removeColumn('Users', 'createdAt');
    await queryInterface.removeColumn('Users', 'updatedAt');

  }
};