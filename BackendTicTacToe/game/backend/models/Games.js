"use strict";

module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define(
    "Games",
    {
      nameGame: DataTypes.STRING,
      typeGame: DataTypes.INTEGER(11),
    },
    {
      tableName: "Games",
    }
  );

  Games.associate = function (models) {
    // associations can be defined here
  };

  return Games;
};
