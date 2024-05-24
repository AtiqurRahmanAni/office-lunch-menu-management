import asyncHandler from "../utils/asyncHandler.js";
import sequelize from "../database/dbConnect.js";
import { Item, ItemDate } from "../database/associations.js";
import jwt from "jsonwebtoken";
import { InternalServerError } from "../utils/errors.js";

export const getAllItems = asyncHandler(async (req, res) => {
  try {
    const databaseResponse = await ItemDate.findAll({
      include: [
        {
          model: Item,
          as: "items",
          attributes: ["id", "itemName", "description"],
        },
      ],
      order: [["date", "ASC"]],
      raw: true,
    });

    const groupedData = Object.values(
      databaseResponse.reduce((acc, item) => {
        const date = item.date;
        if (!acc[date]) {
          acc[date] = {
            date: date,
            items: [],
          };
        }
        if (item["items.id"]) {
          acc[date].items.push({
            id: item["items.id"],
            itemName: item["items.itemName"],
            description: item["items.description"],
          });
        }
        return acc;
      }, {})
    );

    return res.status(201).json(groupedData);
  } catch (err) {
    console.log(`Error getting items: ${err}`);
    throw new InternalServer("Cannot fetch items");
  }
});

export const createItem = asyncHandler(async (req, res) => {
  const { itemName, description, date } = req.body;
  const { token } = req.cookies;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const result = await sequelize.transaction(async (t) => {
      const [itemDate, created] = await ItemDate.findOrCreate({
        where: { date },
        transaction: t,
      });

      const newItem = Item.build({
        itemName,
        description,
        itemDateId: itemDate.id,
        userId: user.id,
      });

      await newItem.save({ transaction: t });
      return newItem;
    });

    res.status(201).json({ message: "Item created successfully" });
  } catch (err) {
    console.log(`Error creating item: ${err}`);
    throw new InternalServerError("Can not create item");
  }
});
