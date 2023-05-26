import express from "express";
import {
  createBooks,
  deleteBook,
  editBook,
  getAllBooks,
  getBookById,
} from "../controllers/bookControllers";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/create", createBooks);
router.put("/edit/:id", editBook);
router.delete("/delete/:id", deleteBook);

export default router;
