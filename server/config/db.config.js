"use strict";
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const oracledb = require('oracledb');
dotenv.config();


oracledb.initOracleClient({ libDir: "C:/oracle/instantclient" });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "oracle",
    dialectOptions: {
      connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SERVICE_NAME}`,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectModule: require('oracledb'),
    logging: false,
    // benchmark: true
  }
);

module.exports = sequelize;
