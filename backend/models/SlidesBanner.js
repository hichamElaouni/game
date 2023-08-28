"use strict";

module.exports = (sequelize, DataTypes) => {
  const SlidesBanner = sequelize.define(
    "SlidesBanner",
    {
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      subTitle: DataTypes.STRING,
    },
    {
      tableName: "SlidesBanner",
    }
  );

  SlidesBanner.associate = function (models) {
    // associations can be defined here
  };

  return SlidesBanner;
};
