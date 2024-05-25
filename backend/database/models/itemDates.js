import sequelize from "../dbConnect.js";
import { DataTypes } from "sequelize";

const ItemDate = sequelize.define("itemDates", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

export default ItemDate;
