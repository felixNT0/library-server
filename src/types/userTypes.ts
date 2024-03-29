import { Document } from "mongoose";

export interface UserType extends Document {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  user_role?: string;
  profile_picture?: string;
}
