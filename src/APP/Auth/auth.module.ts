import { Router } from "express";
import { getGoogleAccountAndSaveController, getUrlGoogleAuthenticationController, loginController, refreshTokenController, registerController } from "./auth.controller";
import { authenticationLimiter } from "../../Utils/limitRequest/RegisterLimit";

const router: Router = Router()

router.post('/register', authenticationLimiter, registerController)
router.post('/login', authenticationLimiter, loginController)
router.get('refresh', refreshTokenController)

// Google Authentication
router.get("/google", getUrlGoogleAuthenticationController);
router.get("/googleget", getGoogleAccountAndSaveController);

export default router
