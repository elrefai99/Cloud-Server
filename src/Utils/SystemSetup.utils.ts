import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import useragent from "express-useragent";
import requestIp from "request-ip";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { errorHandler } from "../Middleware/error-handler";

// Create the rate limit rule
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 5 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request | any) => req.clientIP, // Use custom IP
  handler: (_req: Request | any, res: Response) => {
    res.status(429).json({ code: 429, status: "Too Many Requests", message: "Too many requests from this IP, please try again after an 7 min", });
  },
});

export default (app: Application) => {
  const allowedOrigins = ["http://localhost:3000"];
  const corsOptions = {
    origin: (origin: any, callback: any) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessState: 200,
  };

  app.use(helmet());
  app.use(requestIp.mw());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use("/v0/cdn", express.static("images"));
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(morgan("dev"));
  app.use(useragent.express());
  app.set("trust proxy", true);
  app.use(async (req: Request | any, _res: Response, next: NextFunction) => {
    const clientIP = req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    req.clientIP = clientIP;
    next();
  });
  app.use(limiter);
  app.use(errorHandler);
};
