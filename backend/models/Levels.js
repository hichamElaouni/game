"use strict";

module.exports = (sequelize, DataTypes) => {
    const Levels = sequelize.define(
        "Levels",
        {
            levelNumber: DataTypes.STRING,

        },
        {
            tableName: "Levels",
        }
    );

    Levels.associate = function (models) {
        // associations can be defined here
    };

    return Levels;
};
