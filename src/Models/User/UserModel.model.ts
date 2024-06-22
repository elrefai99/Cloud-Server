import { Schema, model } from "mongoose";
import { toJSON } from "../../Common/Guards/User.toJson.guard";
import UserInterface from "../../Common/Interface/User.interface";

const userSchema = new Schema({
  fullname: {
    type: String,
    default: '',
    trim: true,
    required: true
  },
  username: {
    type: String,
    default: '',
    trim: true,
    required: true
  },
  email: {
    type: String,
    default: '',
    trim: true,
    required: true
  },
  avatar: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    default: '',
    required: true
  },
  phoneNumber: {
    type: String,
    default: '',
    required: true
  },
  codeCountry: {
    type: String,
    default: '',
    required: true
  },
  userApi_ID: {
    type: String,
    default: '',
  },
}, {
  timestamps: true
})

userSchema.methods.toJSON = toJSON

export const UserModel = model<UserInterface>("User", userSchema);
