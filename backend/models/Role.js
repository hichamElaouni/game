"use strict";

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        "Role",
        {
            name: DataTypes.STRING,
            role_id: DataTypes.INTEGER(11),

        },
        {
            tableName: "Role",
        }
    );

    Role.associate = function (models) {
        // associations can be defined here
    };

    return Role;
};
