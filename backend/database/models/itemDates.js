import sequelize from "../dbConnect.js";
import { DataTypes } from "@sequelize/core";

const ItemDate = sequelize.define("itemDates", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

// Sync the model with the database (create the table if it doesn't exist)
// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("ItemDate table synced with the database");
//   })
//   .catch((error) => {
//     console.error("Error syncing ItemDate table:", error);
//   });

export default ItemDate;
