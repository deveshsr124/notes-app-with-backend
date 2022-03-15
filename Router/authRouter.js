import { Router } from "express";
import {
	register,
	login,
	logout,
	verifyToken,
} from "../Controllers/authController.js";
import { validationRules, validate } from "../validator/register-rules.js";
import {
	loginValidationRules,
	loginValidate,
} from "../validator/login-rules.js";

const router = Router();
router.post("/register", validationRules(), validate, register);

router.post("/login", loginValidationRules(), loginValidate, login);

router.post("/logout", logout);

router.get("/verify-token", verifyToken);
export default router;
