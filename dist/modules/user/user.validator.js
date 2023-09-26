"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const updateUserSchema = joi_1.default.object({
    name: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Please enter a valid name',
    }),
    email: joi_1.default.string()
        .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
        .optional()
        .messages({
        'string.pattern.base': 'Please enter a valid email address',
    }),
    contactNo: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Please enter a valid contact number',
    }),
    address: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Please enter a valid address',
    }),
    profileImg: joi_1.default.string().optional().messages({
        'string.pattern.base': 'Please enter a valid Profile image',
    }),
});
exports.userValidator = {
    updateUserSchema,
};
