import { Request } from 'express'
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../Models/User/UserModel.model';

interface DataStored {
  _id: string;
}

interface RequestAuthentication extends Request {
  user: DataStored;
}

export const verifyTokenWithStatus = async (req: RequestAuthentication | any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token: any = req.query.token || req.headers['token'];
    if (!token) {
      res.status(401).json({ code: 401, status: "Unauthorized", message: "Authentication failed: No token provided", });
      return;
    }

    const TOKEN_SECRET_KEY = process.env.TokenSecret;
    if (!TOKEN_SECRET_KEY) {
      res.status(500).json({ code: 500, status: "Internal Server Error", message: "Token secret key is not defined", });
      return;
    }

    jwt.verify(token, TOKEN_SECRET_KEY, async (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({ code: 403, status: "Forbidden", message: "There was an error with the token", });
        return;
      }

      try {
        const user = await UserModel.findOne({ _id: decoded.newUser._id, status: "Confirmed" });

        if (!user) {
          res.status(401).json({ code: 401, status: "Unauthorized", message: "Authentication failed: User not found or not confirmed", });
          return;
        }

        req.user = user;
        next();
      } catch (userError) {
        res.status(500).json({ code: 500, status: "Internal Server Error", message: "Database query error", });
      }
    });
  } catch (tokenError) {
    res.status(500).json({ code: 500, status: "Internal Server Error", message: "Token verification error", });
  }
};
