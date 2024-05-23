import jwt from "jsonwebtoken";
import { BadRequestError, InternalServerError } from "../utils/errors.js";
import asyncHandler from "../utils/asyncHandler.js";

// export const getAllUsers = asyncHandler(async (req, res) => {
//   try {
//     const allUsers = await User.find().select(["-password", "-__v"]);
//     return res.status(200).json(allUsers);
//   } catch (err) {
//     throw new InternalServerError("Error fetching users");
//   }
// });

// export const getProfile = async (req, res) => {
//   try {
//     const { token } = req.cookies;
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     const userInfo = await User.findById(user.id).select(["-__v"]);
//     return res.status(200).json(userInfo);
//   } catch (err) {
//     throw new InternalServerError("Error fetching profile");
//   }
// };
