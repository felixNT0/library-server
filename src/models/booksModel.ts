import { Schema, Types, model } from "mongoose";
import { BookType } from "types/bookTypes";

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
    status: { type: String },
    user: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default model<BookType>("Book", bookSchema);
