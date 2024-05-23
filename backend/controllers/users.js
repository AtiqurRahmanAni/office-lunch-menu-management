import jwt from "jsonwebtoken";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../utils/errors.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../database/models/users.js";

// export const getAllUsers = asyncHandler(async (req, res) => {
//   try {
//     const allUsers = await User.find().select(["-password", "-__v"]);
//     return res.status(200).json(allUsers);
//   } catch (err) {
//     throw new InternalServerError("Error fetching users");
//   }
// });

export const whoAmI = asyncHandler(async (req, res) => {
  const { token } = req.cookies;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  const userData = await User.findByPk(user.id, {
    attributes: { exclude: ["password"] },
  });

  if (!userData) {
    throw new NotFoundError("User not found");
  }
  return res.status(200).json(userData);
});
