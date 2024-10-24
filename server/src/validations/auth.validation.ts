import Joi from 'joi';

export const signupValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'Name should be a string',
            'string.empty': 'Name is required',
            'string.min': 'Name should be at least 3 characters long',
            'string.max': 'Name should not exceed 30 characters',
        }),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.base': 'Email should be a string',
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email address',
        }),

    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(new RegExp('^[a-zA-Z0-9]{5,30}$'))
        .required()
        .messages({
            'string.base': 'Password should be a string',
            'string.empty': 'Password is required',
            'string.min': 'Password should be at least 5 characters long',
            'string.max': 'Password should not exceed 30 characters',
            'string.pattern.base': 'Password must contain only alphanumeric characters',
        }),

    confirmPassword: Joi.any()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Confirm password does not match password',
            'any.required': 'Confirm password is required',
        })
});
