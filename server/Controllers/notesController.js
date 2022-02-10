import { Notes } from "../Model/NotesModel.js";

export const createNotes = async (req, res) => {
	const user = new Notes({
		title: req.body.title,
		content: req.body.content,
	});
	try {
		const savedUser = await user.save();
		const data = await Notes.findById(savedUser._id).populate("id");
		res.status(200).json({
			message: "notes created successfully",
			status: 200,
			data,
		});
	} catch (err) {
		res.status(400).send(err);
	}
};

export const getAllNotes = async (req, res) => {
	try {
		const notes = await Notes.find();
		res.status(200).json({
			status: 200,
			notes,
		});
	} catch (err) {
		res.status(400).send(err);
	}
};
