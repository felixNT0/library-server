import express from "express";
import {
  borrowBook,
  createBooks,
  deleteBook,
  editBook,
  getAllBooks,
  getAllBorrowedBooks,
  getBookById,
  searchBooks,
} from "../controllers/bookControllers";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/borrowed-books", getAllBorrowedBooks);
router.get("/search", searchBooks);
router.post("/create", createBooks);
router.get("/:id", getBookById);
router.put("/edit/:id", editBook);
router.delete("/delete/:id", deleteBook);
router.patch("/borrow-book/:bookId", borrowBook);

export default router;
