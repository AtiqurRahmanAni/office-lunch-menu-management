import asyncHandler from "../utils/asyncHandler.js";
import sequelize from "../database/dbConnect.js";
import { ChoseItem, Item, ItemDate, User } from "../database/associations.js";
import jwt from "jsonwebtoken";
import { InternalServerError } from "../utils/errors.js";
import { Op } from "sequelize";
import { getToday } from "../utils/index.js";

export const getAllItems = asyncHandler(async (req, res) => {
  try {
    const today = getToday();
    const databaseResponse = await ItemDate.findAll({
      attributes: ["id", "date"],
      where: { date: { [Op.gte]: today } },
      include: [
        {
          model: Item,
          as: "items",
          attributes: ["id", "itemName", "description"],
        },
      ],
      order: [["date", "ASC"]],
    });

    return res.status(201).json(databaseResponse);
  } catch (err) {
    console.log(`Error getting items: ${err}`);
    throw new InternalServer("Cannot fetch items");
  }
});

export const getTodaysOptions = asyncHandler(async (req, res) => {
  try {
    const today = getToday();

    const { token } = req.cookies;
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const items = await Item.findAll({
      include: [
        {
          model: ItemDate,
          attributes: [],
          where: { date: today },
        },
      ],
      attributes: ["id", "itemName", "description"],
      order: [["createdAt", "DESC"]],
    });

    const choseItems = await ChoseItem.findAll({
      where: { userId: user.id },
      attributes: ["itemId"],
    });

    const choseItemIds = choseItems.map((item) => item.itemId);

    return res.status(200).json({ items, choseItemIds });
  } catch (err) {
    console.log(`Error fetching today's options: ${err}`);
    throw new InternalServerError(
      "Something went wrong fetching today's options"
    );
  }
});

export const getLunchOptionsSelections = asyncHandler(async (req, res) => {
  try {
    const today = getToday();
    const users = await User.findAll({
      attributes: ["id", "displayName"],
      order: [["displayName", "ASC"]],
      include: [
        {
          model: ChoseItem,
          attributes: ["itemId"],
          include: [
            {
              model: Item,
              attributes: ["id", "itemName", "description"],
              required: true,
              include: [
                {
                  model: ItemDate,
                  where: { date: today },
                  attributes: [],
                },
              ],
            },
          ],
        },
      ],
    });

    return res.status(200).json(users);
  } catch (err) {
    console.log(`Error fetching selection: ${err}`);
    throw new InternalServerError("Something went wrong");
  }
});

export const createItem = asyncHandler(async (req, res) => {
  const { itemName, description, date } = req.body;
  const { token } = req.cookies;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  console.log(description);

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

export const chooseItem = asyncHandler(async (req, res) => {
  const { itemIds } = req.body;
  const { token } = req.cookies;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  const itemUserEntries = itemIds.map((itemId) => ({
    itemId,
    userId: user.id,
  }));

  try {
    ChoseItem.bulkCreate(itemUserEntries);
    return res
      .status(200)
      .json({ message: "Items has been added to your lunch option" });
  } catch (err) {
    console.log(`Error choosing items: ${err}`);
    throw new InternalServerError("Can not choose items");
  }
});
