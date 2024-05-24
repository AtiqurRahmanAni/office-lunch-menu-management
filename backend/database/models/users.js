import sequelize from "../dbConnect.js";
import { DataTypes } from "@sequelize/core";

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "employee"),
      allowNull: false,
      defaultValue: "employee",
    },
  },
  {
    tableName: "users",
  }
);

// Sync the model with the database (create the table if it doesn't exist)
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Users table synced with the database");
  })
  .catch((error) => {
    console.error("Error syncing Users table:", error);
  });

export default User;
