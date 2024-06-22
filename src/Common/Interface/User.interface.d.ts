import { Document } from 'mongoose'

// Interfaces
export interface UserInterface {
  fullname: string
  username: string
  email: string
  avatar: string
  password: string
  phoneNumber: string
  codeCountry: string
  userApi_ID: string
}

export interface toJSON_User extends UserInterface, Document {
  toJSON: () => any // any for now
}

export default UserInterface
