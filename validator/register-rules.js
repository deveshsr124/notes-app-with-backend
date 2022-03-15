import { body, validationResult, check } from "express-validator";

export const validationRules = (req, res) => {
	return [
		body("name")
			.exists({ checkFalsy: true })
			.withMessage("name is required")
			.bail()
			.not()
			.isInt()
			.withMessage("name not valid"),

		body("email")
			.exists({ checkFalsy: true })
			.withMessage("email is required")
			.bail()
			.isEmail()
			.withMessage("Invalid Email"),

		body("password")
			.exists({ checkFalsy: true })
			.withMessage("password is required")
			.bail()
			.isLength({ min: 8 })
			.withMessage("password should be atleast 8 characters"),
	];
};

export const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(200).json({
			errors: errors.array(),
		});
	}
	next();
};
