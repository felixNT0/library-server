import { Schema, model } from "mongoose";
import { BookType } from "types/bookTypes";

export enum BookStatusEnum {
  NOT_BORROWED = "not_borrowed",
  BORROWED = "borrowed",
}

const bookSchema = new Schema<BookType>(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    author: {
      type: String,
      required: [true, "Please add a author"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    imageUrl: {
      type: String,
    },
    status: { type: String || BookStatusEnum },
    user: { type: {}, ref: "User" },
    borrowed_user: { type: {}, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default model<BookType>("Book", bookSchema);
