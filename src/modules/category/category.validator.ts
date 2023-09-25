import Joi from 'joi';

const createCategorySchema = Joi.object({
  title: Joi.string().required().messages({
    'string.pattern.base': 'Please enter a valid title',
    'any.required': 'Title is required',
  }),
});

const updateCategorySchema = Joi.object({
  title: Joi.string().required().messages({
    'string.pattern.base': 'Please enter a valid title',
    'any.required': 'Title is required',
  }),
});

export const categoryValidator = {
  createCategorySchema,
  updateCategorySchema,
};
