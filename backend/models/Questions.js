"use strict";

module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define(
    "Questions",
    {
      title: DataTypes.STRING,
      choices: DataTypes.STRING,
      answer: DataTypes.INTEGER(11),
      point: DataTypes.INTEGER(11),
      idSubject: DataTypes.INTEGER(11),
    },
    {
      tableName: "Questions",
    }
  );

  Questions.associate = function (models) {
    // associations can be defined here
  };

  return Questions;
};
