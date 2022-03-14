import { Notes } from "../Model/NotesModel.js";

export const createNotes = async (req, res) => {
	const user = new Notes(req.body);
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
		const notes = await Notes.find().populate("id");
		res.status(200).json({
			status: 200,
			notes,
		});
	} catch (err) {
		res.status(400).send(err);
	}
};

export const updateNote = async (req, res) => {
	try {
		const notes = {
			title: req.body.title,
			content: req.body.content,
		};
		const updatedNote = await Notes.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			notes
		).populate("id");
		res.status(200).json({
			message: "Notes Updated Successfully",
			status: 200,
			notes,
		});
	} catch (err) {
		res.status(400).send(err);
	}
};

export const deleteNote = async (req, res) => {
	try {
		const deletednote = await Notes.findByIdAndDelete(req.params.id);
		if (!req.params.id) {
			res.status(400).json({
				message: "note not found",
			});
		} else {
			res.status(200).json({
				message: "Note Deleted Successfully",
				status: 200,
			});
		}
	} catch (err) {
		res.status(400).send(err);
	}
};
