"use strict";

module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define(
    "Students",
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      telephone: DataTypes.STRING,
      classStudent: DataTypes.STRING,
      dateBorn: DataTypes.DATE,
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
