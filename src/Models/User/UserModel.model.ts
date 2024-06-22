// UserModel.model.ts
import { Schema, model } from "mongoose";
import { toJSON } from "../../Common/Guards/User.toJson.guard";
import { toJSON_User } from "../../Common/Interface/User.interface";

const userSchema = new Schema<toJSON_User>({
  fullname: {
    type: String,
    default: '',
    trim: true,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Deleted', 'Pending', 'Blocked', 'Ban'],
    default: "Pending"
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
  user_ID: {
    type: String,
    default: '',
  },
  user_api_Key: {
    type: Number,
    default: 0,
  },
  user_Secret_Key: {
    type: String,
    default: '',
  }
}, {
  timestamps: true
})

userSchema.methods.toJSON = toJSON

export const UserModel = model<toJSON_User>("User", userSchema);
