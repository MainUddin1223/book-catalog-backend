import Joi from 'joi';

const updateUserSchema = Joi.object({
  name: Joi.string().optional().messages({
    'string.pattern.base': 'Please enter a valid name',
  }),
  email: Joi.string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .optional()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
    }),
  contactNo: Joi.string().optional().messages({
    'string.pattern.base': 'Please enter a valid contact number',
  }),
  address: Joi.string().optional().messages({
    'string.pattern.base': 'Please enter a valid address',
  }),
  profileImg: Joi.string().optional().messages({
    'string.pattern.base': 'Please enter a valid Profile image',
  }),
});

export const userValidator = {
  updateUserSchema,
};
