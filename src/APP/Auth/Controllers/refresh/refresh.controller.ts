import { Request, Response } from "express";
import { REFRESH_TOKEN_SECRET, refreshUserToken } from "../../../../Common/Guards/JWT/createAccount.guard";
import { UserModel } from "../../../../Models/User/UserModel.model";
import jwt from "jsonwebtoken";

export const refreshTokenController = async (req: Request | any, res: Response): Promise<any> => {
  const tokenRefresh = req.cookies.jwt;
  if (!tokenRefresh) {
    return res.status(401).json({ message: "Please log in", status: 401 });
  }
  jwt.verify(tokenRefresh, REFRESH_TOKEN_SECRET, async (err: any, decoded: any): Promise<any> => {
    if (err) return res.status(403).json({ message: "Forbidden", status: 403 });

    const foundUser = await UserModel.findOne({ _id: decoded.newUser._id, status: "Confirmed" });

    if (!foundUser)
      return res.status(401).json({ message: "User not found", status: 401 });

    const accessToken = refreshUserToken(foundUser._id);

    res.status(200).json({ code: 200, status: "OK", accessToken });
  });
}
