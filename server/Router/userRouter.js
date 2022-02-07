import { Router } from "express";
import { getUsers } from "../Controllers/userController.js";
import { verifyToken } from "../Middlewares/VerifyToken.js";

const router = Router();
router.get("/all-users", verifyToken, getUsers);

export default router;
