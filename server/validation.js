import Joi from "joi";

export const registerValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().min(8).required().email(),
		password: Joi.string().min(8).required(),
	});
	return schema.validate(data);
};

export const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(8).required().email(),
		password: Joi.string().min(8).required(),
	});
	return schema.validate(data);
};
