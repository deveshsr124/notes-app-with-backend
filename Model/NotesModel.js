import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
	{
		id: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export const Notes = mongoose.model("Notes", noteSchema);
