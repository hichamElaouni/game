"use strict";

module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define(
    "Rooms",
    {
      nameRoom: DataTypes.STRING,
      point: DataTypes.INTEGER(11),
      idGame: DataTypes.INTEGER(11),
    },
    {
      tableName: "Rooms",
    }
  );

  Rooms.associate = function (models) {
    // associations can be defined here
  };

  return Rooms;
};
