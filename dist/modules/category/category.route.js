"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAuth_1 = require("../../middlewares/verifyAuth");
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router
    .route('/create-category')
    .post(verifyAuth_1.verifyAdmin, category_controller_1.categoryController.createCategory);
router.route('').get(category_controller_1.categoryController.getAllCategories);
router
    .route('/:id')
    .get(category_controller_1.categoryController.getCategroyById)
    .patch(verifyAuth_1.verifyAdmin, category_controller_1.categoryController.updateCategory)
    .delete(verifyAuth_1.verifyAdmin, category_controller_1.categoryController.deleteCategory);
exports.default = { categoryRouter: router };
