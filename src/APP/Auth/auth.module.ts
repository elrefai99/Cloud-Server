import { Router } from "express";
import { loginController, registerController } from "./auth.controller";
import { authenticationLimiter } from "../../Utils/limitRequest/RegisterLimit";

const router: Router = Router()

router.post('/register', authenticationLimiter, registerController)
router.post('/login', authenticationLimiter, loginController)


export default router
