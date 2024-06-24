import { Request, Response } from "express";
import { getGoogleAuthURL, getTokens, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SERVER_ROOT_URI } from "./shared/google.shared";
import { UserModel } from "../../../../Models/User/UserModel.model";
import { refreshUserToken } from "../../../../Common/Guards/JWT/createAccount.guard";
import bcrypt from 'bcryptjs'
import axios from "axios";

export const getUrlGoogleAuthenticationController = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.status(200).json({ code: 200, status: "OK", path: req.url, timeCall: new Date().toISOString(), Link: getGoogleAuthURL() });
  } catch (err: any) {
    res.status(500).json({ code: 500, status: "Server Error", message: err.message });
  }
};

export const getGoogleAccountAndSaveController = async (req: Request, res: Response) => {
  try {
    const code = req.query.code;

    const { id_token, access_token } = await getTokens({
      code,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      redirectUri: `${SERVER_ROOT_URI}/api/auth/googleget`,
    });

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    }).then((res: any) => res.data)
      .catch((error: any) => {
        console.error("Failed to fetch user");
        throw new Error(error.message);
      });

    if (googleUser.id) {
      // check if the user email is already registered or not
      const checkUserEmail = await UserModel.findOne({ email: googleUser.email, });

      if (checkUserEmail) {
        const refreshJwt = refreshUserToken(checkUserEmail.id);
        res.cookie("jwt", refreshJwt, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 7, });

        // eslint-disable-next-line no-undef
        res.status(200).redirect('');
      } else {
        const outputString = googleUser.name.replace(/\s/g, "-");
        const finalName = outputString + Math.floor(Math.random() * 10000001);

        const password = googleUser.name + googleUser.id + googleUser.email + googleUser.given_name + googleUser.family_name;

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
          fullname: googleUser.name,
          status: "Confirmed",
          email: googleUser.email,
          password: hash,
          username: finalName,
          googleId: googleUser.id,
          avatarUrl: googleUser.picture,
          Verified: true,
        });
        const refreshJwt = refreshUserToken(newUser.id);
        res.cookie("jwt", refreshJwt, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 7, });
        await newUser.save();
        // eslint-disable-next-line no-undef
        res.status(200).redirect('');
      }
    } else {
      res.status(401).json({ code: 401, status: "Unauthorized", message: "This Email Not Exist, try agin", });
    }
  } catch (err: any) {
    res.status(500).json({ code: 500, status: "Internal Server Error", message: err.message, });
  }
};
