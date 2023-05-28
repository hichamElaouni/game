

"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        defaultValue: "https://manager.almadarisp.com/user/img/user.png",
      },

      classUser: {
        type: Sequelize.STRING,
        defaultValue: "1",
      },

      point: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0
      },
      coins: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0
      },
      victories: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0
      },

      losses: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0
      },

      role_id: {
        type: Sequelize.INTEGER(11),
        defaultValue: 3,
        references: {
          model: {
            tableName: "Roles",
          },
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },

      createdAt: {
        type: Sequelize.STRING,
        defaultValue: 0
      },
      updatedAt: {
        type: Sequelize.STRING,
        defaultValue: 0
      },


    },
    )


    await queryInterface.bulkInsert('Users', [{
      first_name: 'Admin',
      last_name: 'Administrator',
      role_id: '1',
      email: 'supadmin@gmail.com',
      password: '030a47c33ab9eedb11462abdcf35d770ec584522',
      image: "https://cdn-icons-png.flaticon.com/512/4668/4668814.png"
    }]);

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
