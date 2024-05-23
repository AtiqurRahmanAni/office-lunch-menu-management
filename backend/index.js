import log from "./middlewares/logger.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import express from "express";
import authRouter from "./routes/auth.js";
// import userRouter from "./routes/users.js";
import db from "./database/dbConfig.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(log);
app.use(
  cors({
    credentials: true,
    origin: process.env.ALLOWED_ORIGIN,
  })
);

db();

app.get("/test", (req, res) => {
  return res.status(200).json({ message: "API is working" });
});

app.use("/auth", authRouter);
// app.use("/users", userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
