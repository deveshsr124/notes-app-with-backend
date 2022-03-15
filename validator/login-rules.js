import { body, validationResult, check } from "express-validator";

export const loginValidationRules = (req, res) => {
	return [
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

export const loginValidate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(200).json({
			errors: errors.array(),
		});
	}
	// const extractedErrors = [];
	// errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
	// console.log(path.join(__dirname, "../../../" + req.file.path));
	next();
};
