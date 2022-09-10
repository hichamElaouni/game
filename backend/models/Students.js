"use strict";

module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define(
    "Students",
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      telephone: DataTypes.STRING,
      adress: DataTypes.STRING,
      dateBorn: DataTypes.DATE,
      classStudent: DataTypes.STRING,
      losses: DataTypes.INTEGER(11),
      victories: DataTypes.INTEGER(11),
      point: DataTypes.INTEGER(11),
    },
    {
      tableName: "Students",
    }
  );

  Students.associate = function (models) {
    // associations can be defined here
  };

  return Students;
};
