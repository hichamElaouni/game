"use strict";

module.exports = (sequelize, DataTypes) => {
    const Subjects = sequelize.define(
        "Subjects",
        {
            name: DataTypes.STRING,

        },
        {
            tableName: "Subjects",
        }
    );

    Subjects.associate = function (models) {
        // associations can be defined here
    };

    return Subjects;
};
