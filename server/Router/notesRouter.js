import { Router } from "express";
import { createNotes, getAllNotes } from "../Controllers/notesController.js";
import { verifyToken } from "../Middlewares/VerifyToken.js";

const router = Router();
router.post("/create-notes", verifyToken, createNotes);

router.get("/all-notes", verifyToken, getAllNotes);
export default router;
