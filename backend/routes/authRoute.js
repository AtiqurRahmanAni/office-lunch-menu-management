import express from "express";
import { login, signup, logout } from "../controllers/auth.js";
import checkToken from "../middlewares/checkToken.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/logout", checkToken, logout);

export default authRouter;
