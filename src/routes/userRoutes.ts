import express from "express";
import { loginUser, registerUser } from "../controllers/userAuthControllers";
import {
  deleteUser,
  editUser,
  getAllUsers,
  getUserProfile,
} from "../controllers/userControllers";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/profile", getUserProfile);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);

export default router;
