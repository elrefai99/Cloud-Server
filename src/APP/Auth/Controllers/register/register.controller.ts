// register.controller.ts
import { NextFunction, Request, Response } from "express";
import { RegisterDTO } from "../../DTO/register.dto";
import bcrypt from 'bcryptjs';
import { createAvatarOfUserName } from "../../../../Common/Decorators/avatar.decorators";
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from "./service/users.repository";
import { UserModel } from "../../../../Models/User/UserModel.model";
import { createFirstToken } from "../../../../Common/Guards/JWT/createAccount.guard";
import path from "path";
import fs from "fs-extra";

export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const data: RegisterDTO = req.body;
    const userRepository = new UserRepository(UserModel);

    const checkEmail = await userRepository.checkEmailAndPassword({ email: data.email })
    if (checkEmail) {
      return res.status(401).json({ code: 401, path: req.url, timeCall: new Date().toISOString(), status: "Unauthorized", message: "Email is already used, try agin", });
    }

    // Create Username
    const outputString = data.fullname.replace(/\s/g, "-");
    const username = outputString + Math.floor(Math.random() * 100001);
    data.username = username
    // Hash Password
    const passwordSalt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(req.body.password, passwordSalt);

    data.user_ID = uuidv4();

    // Chech if the current year folder exists.
    if (!fs.existsSync(path.join(__dirname, "../../../", `images/User/${username}`))) {
      fs.mkdirSync(path.join(__dirname, "../../../../../", `images/User/${username}`));
      createAvatarOfUserName(data.fullname, username);
      data.avatar = `http://localhost:9000/v0/cdn/user/${username}/${data.fullname.split(' ').join('-')}.png`;
    }
    data.user_api_Key = Math.floor(Math.random() * 50000000000000000001);
    data.user_Secret_Key = uuidv4().split('-').join('') as string;
    const newUser = await userRepository.create(data);

    const token = createFirstToken(newUser._id)

    res.status(201).json({ code: 201, path: req.url, timeCall: new Date().toISOString(), status: "Created", token });
  } catch (err: any) {
    next(err);
  }
}
