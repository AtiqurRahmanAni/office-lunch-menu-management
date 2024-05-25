import sequelize from "../dbConnect.js";
import { DataTypes } from "@sequelize/core";

const ChoseItem = sequelize.define("choseItems", {});

export default ChoseItem;
