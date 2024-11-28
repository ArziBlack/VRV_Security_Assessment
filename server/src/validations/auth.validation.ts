import Joi from "joi";

export const signupValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name is required",
    "string.min": "Name should be at least 3 characters long",
    "string.max": "Name should not exceed 30 characters",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email should be a string",
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
    }),

  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z0-9]{5,30}$"))
    .required()
    .messages({
      "string.base": "Password should be a string",
      "string.empty": "Password is required",
      "string.min": "Password should be at least 5 characters long",
      "string.max": "Password should not exceed 30 characters",
      "string.pattern.base":
        "Password must contain only alphanumeric characters",
    }),

  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password does not match password",
    "any.required": "Confirm password is required",
  }),

  phone: Joi.string()
    .pattern(new RegExp("^[0-9]{10,15}$"))
    .required()
    .messages({
      "string.base": "Phone number should be a string",
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be between 10 and 15 digits",
    }),

  country: Joi.string().min(2).max(50).required().messages({
    "string.base": "Country should be a string",
    "string.empty": "Country is required",
    "string.min": "Country should be at least 2 characters long",
    "string.max": "Country should not exceed 50 characters",
  }),

  homeAddress: Joi.string().min(5).max(100).required().messages({
    "string.base": "Home address should be a string",
    "string.empty": "Home address is required",
    "string.min": "Home address should be at least 5 characters long",
    "string.max": "Home address should not exceed 100 characters",
  }),

  state: Joi.string().min(2).max(50).required().messages({
    "string.base": "State should be a string",
    "string.empty": "State is required",
    "string.min": "State should be at least 2 characters long",
    "string.max": "State should not exceed 50 characters",
  }),
});
