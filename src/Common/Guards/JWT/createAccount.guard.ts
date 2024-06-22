import jwt from "jsonwebtoken";
import { configDotEnv } from "../../../Config/env/env";
configDotEnv()

const SECRET_KEY: any = process.env.TokenSecret;
const REFRESH_TOKEN_SECRET: any = process.env.REFRESH_TOKEN_SECRET;

export const createFirstToken = (id: any) => {
  return jwt.sign({ user_id: id }, SECRET_KEY, { expiresIn: "15m", });
};

export const refreshUserToken = (id: any) => {
  return jwt.sign({ user_id: id }, REFRESH_TOKEN_SECRET, { expiresIn: "7d", });
};
