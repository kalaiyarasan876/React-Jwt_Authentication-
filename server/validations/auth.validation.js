const Joi = require('joi');

exports.registerValidation = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long"
    }),
    email: Joi.string().email().pattern(/@gmail\.com$/).required().messages({
        "string.pattern.base": "Email must be a Gmail address",
        "string.email": "Invalid email format",
        "string.empty": "Email is required"
    }),
    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$'))
        .required()
        .messages({
            "string.pattern.base": "Password must contain uppercase, lowercase, number and special character",
            "string.min": "Password must be at least 8 characters long",
            "string.empty": "Password is required"
        })
});


exports.loginValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.empty": "Username is required",
            "string.min": "Name must be at least 3 characters long"
        }),
    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$'))
        .required()
        .messages({
            "string.pattern.base": "Password must contain uppercase, lowercase, number, and special character",
            "string.min": "Password must be at least 8 characters long",
            "string.empty": "Password is required"
        })
});