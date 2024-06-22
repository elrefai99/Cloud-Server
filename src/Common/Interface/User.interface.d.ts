// User.interface.ts
import { Document } from 'mongoose';

export interface UserInterface {
  fullname: string;
  status: string
  username: string;
  email: string;
  avatar: string;
  password: string;
  phoneNumber: string;
  codeCountry: string;
  user_ID: string;
  user_api_Key: number;
  user_Secret_Key: string;
}

export interface toJSON_User extends UserInterface, Document {
  toJSON: () => any; // any for now
}

export default UserInterface;
