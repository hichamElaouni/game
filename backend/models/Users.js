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
