import express from "express";
import registerUser from "../controllers/auth/registerController.js";
import verifyUserEmail from "../controllers/auth/verifyEmailContoller.js";
import loginUser from "../controllers/auth/loginController.js";
import { loginLimiter } from "../Middleware/apiLimiter.js";
import newAccessToken from "../controllers/auth/refreshTokenController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:emailToken/:userId", verifyUserEmail);
router.post("/login", loginLimiter, loginUser);
router.get("/new-access-token", newAccessToken);

export default router;
