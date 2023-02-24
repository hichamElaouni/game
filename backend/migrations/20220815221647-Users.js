// "use strict";
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     return await queryInterface.createTable("Users", {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER(11),
//       },
//       fullName: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       password: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       classUser: {
//         type: Sequelize.STRING,
//       },
//       telephone: {
//         type: Sequelize.STRING,
//       },
//       dateBorn: {
//         type: Sequelize.STRING,
//       },
//       point: {
//         type: Sequelize.INTEGER(11),
//         defaultValue: 0,
//       },
//       victories: {
//         type: Sequelize.INTEGER(11),
//         defaultValue: 0,
//       },
//       losses: {
//         type: Sequelize.INTEGER(11),
//         defaultValue: 0,
//       },
//       adress: {
//         allowNull: false,
//         type: Sequelize.STRING,
//       },
//       image: {

//         type: Sequelize.STRING,
//         defaultValue: "https://manager.almadarisp.com/user/img/user.png"
//       },
//       roles: {
//         allowNull: false,
//         type: Sequelize.STRING,
//         defaultValue: "student"
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//   },
// };


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
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
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
      image: {
        type: Sequelize.STRING,
        defaultValue: "https://manager.almadarisp.com/user/img/user.png"
      },
      roles: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "student"
      },
      skills: {
        type: Sequelize.STRING,
      },
      social_links: {
        type: Sequelize.STRING,
      },
      biography: {
        type: Sequelize.STRING,
      },
      role_id: {
        type: Sequelize.INTEGER(11),
      },
      date_added: {
        type: Sequelize.INTEGER(11),
      },
      last_modified: {
        type: Sequelize.INTEGER(11),
      },
      wishlist: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      payment_keys: {
        type: Sequelize.STRING,
      },
      verification_code: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER(11),
      },
      is_instructor: {
        type: Sequelize.INTEGER(11),
      },
      sessions: {
        type: Sequelize.STRING,
      },
      subscriptions_date: {
        type: Sequelize.STRING,
      },
      subscription_type: {
        type: Sequelize.STRING,
      },
      special_instructor: {
        type: Sequelize.STRING,
      },
      special_instructor_rate: {
        type: Sequelize.INTEGER(11),
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
