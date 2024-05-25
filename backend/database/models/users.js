import sequelize from "../dbConnect.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("users", {
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
});

export default User;
