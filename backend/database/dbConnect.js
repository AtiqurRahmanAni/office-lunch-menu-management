import { Sequelize } from "sequelize";

const config = {
  HOST: "localhost",
  USER: process.env.DB_USER_NAME,
  PASSWORD: process.env.DB_USER_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
});

export default sequelize;
