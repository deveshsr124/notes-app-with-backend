import { User } from "../Model/UserModel.js";
export const getUsers = async (req, res) => {
	try {
		const allUser = await User.find();
		if (!allUser) return res.send(200).send("No users Found");

		res.status(200).json({ data: allUser });
	} catch (err) {
		res.status(400).send(err);
	}
};
