import Joi from "joi";

export const userRegistrationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(25)
    .pattern(/^[a-zA-Z\s'-]+$/)
    .required()
    .trim()
    .messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name can't be longer than 25 characters",
      "string.pattern.base": "Please enter a valid name",
      "any.required": "Name is required",
    }),

  email: Joi.string().email().lowercase().trim().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .min(8)
    .max(128)
    //standard security password messures
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password can't be longer than 128 characters",
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&)",
      "any.required": "Password is required",
    }),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .min(8)
    .max(128)
    //standard security password messures
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password can't be longer than 128 characters",
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&)",
      "any.required": "Password is required",
    }),
});
