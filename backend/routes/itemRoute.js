import { createItem, getAllItems } from "../controllers/items.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

// router.get("/", checkToken, getAllUsers);

router.route("/").get(checkToken, getAllItems).post(checkToken, createItem);

export default router;
