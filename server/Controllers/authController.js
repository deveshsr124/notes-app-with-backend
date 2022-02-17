import { User } from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerValidation, loginValidation } from "../validation.js";

export const register = async (req, res) => {
	const { error } = registerValidation(req.body);
	if (error) return res.status(200).send(error.details[0].message);
	// checking if email exists
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(200).send("email already exists");
	//create new user
	const salt = await bcrypt.genSalt(10);
	const hashPass = await bcrypt.hash(req.body.password, salt);
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPass,
	});
	try {
		const savedUser = await user.save();
		const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
		res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 });
		res.status(200).json({
			token: token,
			isLoggedIn: true,
			message: "Registered Successfully",
		});
	} catch (err) {
		res.status(400).send(err);
	}
};

export const login = async (req, res) => {
	const { error } = loginValidation(req.body);
	if (error) return res.status(200).send(error.details[0].message);

	// checking if email exists
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(200).send("email not found");

	// checking for invalid password
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(200).send("Invalid Password");
	try {
		const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
		res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 });
		res.status(200).json({
			token: token,
			isLoggedIn: true,
			message: "logged in successfully",
		});
	} catch (err) {
		res.status(400).send(err);
	}
	// creating tokens
};

export const logout = async (req, res) => {
	res.clearCookie("jwt");
	res.status(200).json({
		message: "Logged Out Successfully",
	});
};

export const verifyToken = (req, res) => {
	const cookie = req.headers.cookie ? req.headers.cookie.split("=")[1] : "";
	if (cookie !== "") {
		jwt.verify(cookie, process.env.TOKEN_SECRET, async (err, decoded) => {
			if (err) {
				res.status(200).json({ isLoggedIn: false });
			} else {
				const user = await User.findOne({ _id: decoded._id });

				res.status(200).json({ isLoggedIn: true, user });
			}
		});
	} else {
		res.status(200).json({ isLoggedIn: false });
	}
};
