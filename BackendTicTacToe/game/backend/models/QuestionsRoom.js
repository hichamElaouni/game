"use strict";

module.exports = (sequelize, DataTypes) => {
  const QuestionsRoom = sequelize.define(
    "QuestionsRoom",
    {
      idQuestion: DataTypes.INTEGER(11),
      idRoom: DataTypes.INTEGER(11),
    },
    {
      tableName: "QuestionsRoom",
    }
  );

  QuestionsRoom.associate = function (models) {
    // associations can be defined here
  };

  return QuestionsRoom;
};
