import { Router } from "express";
import {
	register,
	login,
	logout,
	verifyToken,
} from "../Controllers/authController.js";

const router = Router();
router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/verify-token", verifyToken);
export default router;
