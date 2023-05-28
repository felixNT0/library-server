import { Document } from "mongoose";
import { UserType } from "./userTypes";

export interface BookType extends Document {
  title: string;
  author: string;
  description: string;
  imageUrl?: string;
  status?: string;
  user?: UserType;
  borrowed_user?: UserType;
}
