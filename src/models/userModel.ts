import { Schema, model } from "mongoose";
import { UserType } from "types/userTypes";

const userSchema = new Schema<UserType>(
  {
    first_name: {
      type: String,
      required: [true, "Please add a first name"],
    },
    last_name: {
      type: String,
      required: [true, "Please add a last name"],
    },
    username: {
      type: String,
      required: [true, "Please add a username"],
    },
    profile_picture: {
      type: String,
    },
    user_role: { type: String },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

export default model<UserType>("User", userSchema);
