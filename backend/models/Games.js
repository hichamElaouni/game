"use strict";

module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define(
    "Games",
    {
      nameGame: DataTypes.STRING,
      Image: DataTypes.STRING,
      typeGame: DataTypes.INTEGER(11),
    },
    {
      tableName: "Games",
    }
  );

  //  await Games.create({ nameGame: "Tic Tac Teo" });

  Games.associate = function (models) {
    // associations can be defined here
  };

  return Games;
};
