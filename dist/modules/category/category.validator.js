"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const createCategorySchema = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        'string.pattern.base': 'Please enter a valid title',
        'any.required': 'Title is required',
    }),
});
const updateCategorySchema = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        'string.pattern.base': 'Please enter a valid title',
        'any.required': 'Title is required',
    }),
});
exports.categoryValidator = {
    createCategorySchema,
    updateCategorySchema,
};
