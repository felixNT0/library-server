import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import BooksModel from "../models/booksModel";
import UserModel from "../models/userModel";

const secretKey = process.env.DEFAULT_TOKEN || "secrettoken";

export const createBooks = asyncHandler(async (req, res, next) => {
  const { title, author, description, imageUrl, status } = req.body;

  const token = req.headers.authorization as string;

  if (!title.trim() || !author.trim() || !description.trim()) {
    res.status(400).send("Please add all fields");
  }

  try {
    const bookExists = await BooksModel.findOne({ title });

    if (bookExists) {
      res.status(400).send("Book already exists");
    } else {
      if (token && token.split(" ")[1]) {
        let decodedToken = jwt.verify(token.split(" ")[1], secretKey) as string;
        let { id } = decodedToken as any;

        if (id) {
          const user = await UserModel.findById(id);
          const bookCreated = await BooksModel.create({
            title,
            author,
            description,
            imageUrl,
            status,
            user: user,
          });

          if (bookCreated) {
            res.status(200).send({
              _id: bookCreated.id,
            });
          } else {
            res.status(400).send("Invalid user data");
          }
        }
      }
    }
  } catch (error) {
    next(error);

    console.log(error);
  }
});

export const editBook = asyncHandler(async (req, res, next) => {
  const { title, author, description } = req.body;
  const { id } = req.params;

  try {
    const books = await BooksModel.findOneAndUpdate(
      { _id: id },
      { title: title, author: author, description: description },
      { new: true }
    );

    if (books) {
      res.status(200).send({ books });
    } else {
      res.status(400);
      res.send("Invalid credentials");
    }
  } catch (error) {
    next(error);

    console.log(error);
  }
});

export const deleteBook = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedBook = await BooksModel.findByIdAndRemove(id);
    if (deletedBook) {
      res.status(200).send({ deleteBook });
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    next(error);

    console.log(error);
  }
});

export const getAllBooks = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    if (token) {
      const books = await BooksModel.find();
      if (books) {
        res.status(200).send({ books });
      } else {
        res.status(200).send("No books found");
      }
    }
  } catch (error) {
    next(error);
    res.status(400).send("No users found");
    console.log(error);
  }
});

export const getBookById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await BooksModel.findById(id);
    if (book) {
      res.status(200).send({ book });
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    next(error);

    console.log(error);
  }
});
