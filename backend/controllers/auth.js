import jwt from "jsonwebtoken";
import { NotFoundError, BadRequestError } from "../utils/errors.js";
import asyncHandler from "../utils/asyncHandler.js";
import { hashPassword, comparePassword } from "../utils/index.js";
import { User } from "../database/associations.js";
import LoginResponseDTO from "../dtos/LoginResponseDTO.js";

const lifetime = "3600000";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const isMatched = await comparePassword(password, user.password);

  if (!isMatched) {
    throw new BadRequestError("Wrong password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: lifetime }
  );

  res.cookie("token", token, {
    maxAge: lifetime,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  return res.status(200).json(new LoginResponseDTO(user));
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  return res.status(200).json({ message: "Logout successful" });
});

export const signup = asyncHandler(async (req, res) => {
  const { email, displayName, password } = req.body;

  const otherUser = await User.findOne({ where: { email } });
  if (otherUser) {
    throw new BadRequestError("Email already in use");
  }

  const hashedPassword = await hashPassword(password);
  const newUser = User.build({
    email,
    displayName,
    password: hashedPassword,
  });
  await newUser.save();

  return res.status(201).json({ message: "Signup successful" });
});
