const dotenv = require("dotenv");
dotenv.config();

const { DB_SERVER, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } =
  process.env || {};

module.exports = {
  development: {
    username: "root",
    database: "games",
    host: "localhost",
    port: 3306,
    dialect: "mariadb",
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_SERVER,
    port: DB_PORT,
    dialect: "mariadb",
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_SERVER,
    port: DB_PORT,
    dialect: "mariadb",
  },
};
