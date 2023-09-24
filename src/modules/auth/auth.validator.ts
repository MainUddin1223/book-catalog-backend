import Joi from 'joi';

const signupValidator = Joi.object({
  name: Joi.string().required().messages({
    'string.pattern.base': 'Please enter a valid name',
    'any.required': 'name is required',
  }),
  email: Joi.string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(5).max(16).required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot exceed {#limit} characters',
    'any.required': 'Password is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.pattern.base': 'Please enter a valid contact number',
    'any.required': 'Contact number is required',
  }),
  address: Joi.string().required().messages({
    'string.pattern.base': 'Please enter a valid address',
    'any.required': 'Address is required',
  }),
  profileImg: Joi.string().required().messages({
    'string.pattern.base': 'Please enter a valid Profile image',
    'any.required': 'profile img is required',
  }),
});
const signinValidator = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(5).max(16).required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot exceed {#limit} characters',
    'any.required': 'Password is required',
  }),
});

export const authValidator = {
  signupValidator,
  signinValidator,
};
