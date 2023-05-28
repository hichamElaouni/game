"use strict";

module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define(
        "Messages",
        {
            text: DataTypes.STRING,

        },
        {
            tableName: "Messages",
        }
    );

    Messages.associate = function (models) {
        // associations can be defined here
    };

    return Messages;
};
