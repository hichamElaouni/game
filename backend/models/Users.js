"use strict";

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      telephone: DataTypes.STRING,
      adress: DataTypes.STRING,
      dateBorn: DataTypes.STRING,
      classUser: DataTypes.STRING,
      losses: DataTypes.INTEGER(11),
      victories: DataTypes.INTEGER(11),
      point: DataTypes.INTEGER(11),
      roles: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      tableName: "Users",
    }
  );

  Users.associate = function (models) {
    // associations can be defined here
  };

  return Users;
};




// "use strict";

// module.exports = (sequelize, DataTypes) => {
//   const Users = sequelize.define(
//     "Users",
//     {
//       first_name: DataTypes.STRING,
//       last_name: DataTypes.STRING,
//       email: DataTypes.STRING,
//       password: DataTypes.STRING,

//       classUser: DataTypes.STRING,
//       losses: DataTypes.INTEGER(11),
//       victories: DataTypes.INTEGER(11),
//       point: DataTypes.INTEGER(11),
//       dateBorn: DataTypes.STRING,
//       image: DataTypes.STRING,
//       roles: DataTypes.STRING,

//       skills: DataTypes.STRING,
//       social_links: DataTypes.STRING,
//       biography: DataTypes.STRING,
//       role_id: DataTypes.INTEGER(11),
//       date_added: DataTypes.INTEGER(11),
//       last_modified: DataTypes.INTEGER(11),
//       wishlist: DataTypes.STRING,
//       title: DataTypes.STRING,
//       payment_keys: DataTypes.STRING,
//       verification_code: DataTypes.STRING,
//       status: DataTypes.INTEGER(11),
//       is_instructor: DataTypes.INTEGER(11),
//       sessions: DataTypes.STRING,
//       subscriptions_date: DataTypes.STRING,
//       subscription_type: DataTypes.STRING,
//       special_instructor: DataTypes.STRING,
//       special_instructor_rate: DataTypes.INTEGER(11),


//     },
//     {
//       tableName: "Users",
//     }
//   );

//   Users.associate = function (models) {
//     // associations can be defined here
//   };

//   return Users;
// };
