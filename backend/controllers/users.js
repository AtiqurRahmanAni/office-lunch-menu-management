import jwt from "jsonwebtoken";
import { BadRequestError, NotFoundError } from "../utils/errors.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../database/models/users.js";
import { hashPassword } from "../utils/index.js";

// export const getAllUsers = asyncHandler(async (req, res) => {
//   try {
//     const allUsers = await User.find().select(["-password", "-__v"]);
//     return res.status(200).json(allUsers);
//   } catch (err) {
//     throw new InternalServerError("Error fetching users");
//   }
// });

export const createAdmin = asyncHandler(async (req, res) => {
  const { email, displayName, password } = req.body;
  const otherUser = await User.findOne({ where: { email } });
  if (otherUser) {
    throw new BadRequestError("Email already in use");
  }

  const hashedPassword = await hashPassword(password);
  const newAdminUser = User.build({
    email,
    displayName,
    password: hashedPassword,
    role: "admin",
  });
  await newAdminUser.save();

  return res.status(201).json({ message: "Signup successful" });
});

export const whoAmI = asyncHandler(async (req, res) => {
  const { token } = req.cookies;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  const userData = await User.findByPk(user.id, {
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });

  if (!userData) {
    throw new NotFoundError("User not found");
  }
  return res.status(200).json(userData);
});
