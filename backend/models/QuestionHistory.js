"use strict";

module.exports = (sequelize, DataTypes) => {
  const QuestionsHistory = sequelize.define(
    "QuestionsHistory",
    {
      idQuestion: DataTypes.INTEGER(11),
      idUser: DataTypes.INTEGER(11),
      selectedAnswer: DataTypes.INTEGER(11),
      idRoomHistory: DataTypes.INTEGER(11),
    },
    {
      tableName: "QuestionsHistory",
    }
  );

  QuestionsHistory.associate = function (models) {
    // associations can be defined here
  };

  return QuestionsHistory;
};
