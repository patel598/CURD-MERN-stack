import Joi from 'joi';

export const userValidationSchema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().required(),
    password: Joi.string(),
    type: Joi.string(),
});

