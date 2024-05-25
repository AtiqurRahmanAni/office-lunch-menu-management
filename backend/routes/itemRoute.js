import {
  chooseItem,
  createItem,
  getAllItems,
  getTodaysOptions,
  getLunchOptionsSelections,
} from "../controllers/items.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.route("/").get(checkToken, getAllItems).post(checkToken, createItem);
router.get("/today", checkToken, getTodaysOptions);
router.get("/selections", checkToken, getLunchOptionsSelections);
router.post("/choose", checkToken, chooseItem);

export default router;
