import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, username, email, password, user_role } =
    req.body;

  try {
    if (
      !first_name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !last_name.trim() ||
      !username.trim()
    ) {
      res.status(400).send("Please add all fields");
    }

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const role = user_role ? user_role : "student";
    const user = await UserModel.create({
      first_name,
      last_name,
      email,
      username,
      user_role: role,
      password: hashedPassword,
    });

    if (user) {
      res.status(200).send({
        _id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        user_role: user.user_role,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).send("Invalid user data");
    }
  } catch (error) {
    next(error);

    console.log(error);
  }
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).send({
        _id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        user_role: user.user_role,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    next(error);

    console.log(error);
  }
});

const secretKey = String(process.env.DEFAULT_TOKEN) || "secrettoken";

export const generateToken = (id: any) => {
  return jwt.sign({ id }, secretKey, {
    expiresIn: "30d",
  });
};
