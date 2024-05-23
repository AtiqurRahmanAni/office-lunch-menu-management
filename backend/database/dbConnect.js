import { Sequelize } from "@sequelize/core";

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

const sequelize = new Sequelize({
  dialect: config.dialect,
  database: config.DB,
  user: config.USER,
  password: config.PASSWORD,
  host: config.HOST,
  port: 5432,
  logging: false,
  query: { raw: true },
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

export default sequelize;
