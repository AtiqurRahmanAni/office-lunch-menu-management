import sequelize from "../dbConnect.js";
import { DataTypes } from "@sequelize/core";

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

// Sync the model with the database (create the table if it doesn't exist)
// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Items table synced with the database");
//   })
//   .catch((error) => {
//     console.error("Error syncing Items table:", error);
//   });

export default Item;
