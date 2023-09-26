"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const signupValidator = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.pattern.base': 'Please enter a valid name',
        'any.required': 'name is required',
    }),
    role: joi_1.default.string().required().valid('admin', 'customer').messages({
        'string.pattern.base': 'Please enter a valid role',
        'any.required': 'role is required',
    }),
    email: joi_1.default.string()
        .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
        .required()
        .messages({
        'string.pattern.base': 'Please enter a valid email address',
        'any.required': 'Email is required',
    }),
    password: joi_1.default.string().min(5).max(16).required().messages({
        'string.min': 'Password must be at least {#limit} characters long',
        'string.max': 'Password cannot exceed {#limit} characters',
        'any.required': 'Password is required',
    }),
    contactNo: joi_1.default.string().required().messages({
        'string.pattern.base': 'Please enter a valid contact number',
        'any.required': 'Contact number is required',
    }),
    address: joi_1.default.string().required().messages({
        'string.pattern.base': 'Please enter a valid address',
        'any.required': 'Address is required',
    }),
    profileImg: joi_1.default.string().required().messages({
        'string.pattern.base': 'Please enter a valid Profile image',
        'any.required': 'profile img is required',
    }),
});
const signinValidator = joi_1.default.object({
    email: joi_1.default.string()
        .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
        .required()
        .messages({
        'string.pattern.base': 'Please enter a valid email address',
        'any.required': 'Email is required',
    }),
    password: joi_1.default.string().min(5).max(16).required().messages({
        'string.min': 'Password must be at least {#limit} characters long',
        'string.max': 'Password cannot exceed {#limit} characters',
        'any.required': 'Password is required',
    }),
});
exports.authValidator = {
    signupValidator,
    signinValidator,
};
