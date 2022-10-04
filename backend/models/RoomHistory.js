"use strict";

module.exports = (sequelize, DataTypes) => {
  const RoomHistory = sequelize.define(
    "RoomHistory",
    {
      idRoom: DataTypes.INTEGER(11),
      idStudent_1: DataTypes.INTEGER(11),
      idStudent_2: DataTypes.INTEGER(11),
      victories: DataTypes.INTEGER(11),
      losses: DataTypes.INTEGER(11),
      roundPlay: DataTypes.INTEGER(11),
    },
    {
      tableName: "RoomHistory",
    }
  );

  RoomHistory.associate = function (models) {
    // associations can be defined here
  };

  return RoomHistory;
};
