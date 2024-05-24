import express from "express";
import checkToken from "../middlewares/checkToken.js";
import { createAdmin, whoAmI } from "../controllers/users.js";

const router = express.Router();

// router.get("/", checkToken, getAllUsers);

router.post("/admin", createAdmin);

router.get("/whoami", checkToken, whoAmI);

export default router;
