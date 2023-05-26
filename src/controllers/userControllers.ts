import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";

const secretKey = String(process.env.DEFAULT_TOKEN) || "secrettoken";

export const editUser = asyncHandler(async (req, res, next) => {
  const { email, name } = req.body;
  const { id } = req.params;
  const token = req.headers.authorization as string;

  if (!token) {
    res.status(400).send("Token is required");
  }

  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      { name: name, email: email },
      { new: true }
    );

    if (user) {
      const { first_name, last_name, email, _id, username, user_role } = user;
      res
        .status(200)
        .send({ first_name, last_name, email, _id, username, user_role });
    } else {
      res.status(400);
      res.send("Invalid credentials");
    }
  } catch (error) {
    next(error);

    console.log(error);
  }
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization as string;
  if (!token) {
    res.status(400).send("Token is required");
  }

  try {
    const deletedUser = await UserModel.findByIdAndRemove(id);
    if (deletedUser) {
      res.status(200).send("User Deleted Successfully");
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    next(error);

    console.log(error);
  }
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await UserModel.find({}, "first_name last_name email _id");
    res.status(200).send({ users });
  } catch (error) {
    next(error);
    res.status(400).send("No users found");
    console.log(error);
  }
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization as string;
  if (!token) {
    res.status(400).send("Token is required");
  }

  try {
    const newToken = token.split(" ")[1];
    if (token || newToken) {
      let decodedToken = jwt.verify(newToken, secretKey);
      let { id } = decodedToken as any;
      if (id) {
        const user = await UserModel.findById(
          id,
          "_id first_name last_name username user_role email"
        );
        res.status(200).send({ user });
      } else {
        res.status(400).send("User does not exist");
      }
    } else {
      res.status(401).send("UnAuthorized User");
    }
  } catch (error) {
    next(error);
    res.status(400).send("No users found");
    console.log(error);
  }
});
