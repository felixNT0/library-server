import { UserType } from "./userTypes";

export type BookType = {
  title: string;
  author: string;
  description: string;
  imageUrl?: string;
  status?: string;
  user?: UserType;
};
