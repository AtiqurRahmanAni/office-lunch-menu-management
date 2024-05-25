import {
  chooseItem,
  createItem,
  getAllItems,
  getTodaysOptions,
} from "../controllers/items.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.route("/").get(checkToken, getAllItems).post(checkToken, createItem);
router.get("/today", checkToken, getTodaysOptions);
router.post("/choose", checkToken, chooseItem);

export default router;
