// register.controller.ts
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { refreshUserToken } from "../../../../Common/Guards/JWT/createAccount.guard";
import { LoginDTO } from "../../DTO/Login.dto";
import { UserRepository } from "../register/service/users.repository";
import { UserModel } from "../../../../Models/User/UserModel.model";

export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const data: LoginDTO = req.body;
    const userRepository = new UserRepository(UserModel);

    const checkEmail = await userRepository.checkEmailAndPassword({ email: data.email, status: 'Active' })
    if (!checkEmail) {
      return res.status(401).json({ code: 401, path: req.url, timeCall: new Date().toISOString(), status: "Unauthorized", message: "Email is already used, try agin", });
    }
    else {
      const checkPassword = await bcrypt.compare(data.password, checkEmail!.password);
      if (!checkPassword) {
        return res.status(401).json({ code: 401, path: req.url, timeCall: new Date().toISOString(), status: "Unauthorized", message: "The password is incorrect. Please try again.", });
      }
      else {
        const refreshJwt = refreshUserToken(checkEmail!._id);
        res.cookie("userSession", refreshJwt, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 7, });
        res.status(200).json({ code: 200, path: req.url, timeCall: new Date().toISOString(), status: "OK", token: refreshJwt });
      }
    }
  } catch (err: any) {
    next(err);
  }
}
