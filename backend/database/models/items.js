import sequelize from "../dbConnect.js";
import { DataTypes } from "sequelize";

const Item = sequelize.define("items", {
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Item;
