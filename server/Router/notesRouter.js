import { Router } from "express";
import {
	createNotes,
	getAllNotes,
	updateNote,
	deleteNote,
} from "../Controllers/notesController.js";
import { verifyToken } from "../Middlewares/VerifyToken.js";

const router = Router();
router.post("/create-notes", verifyToken, createNotes);

router.get("/all-notes", verifyToken, getAllNotes);

router.patch(`/update-notes/:id`, verifyToken, updateNote);

router.delete(`/delete-note/:id`, verifyToken, deleteNote);
export default router;
