"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAuth_1 = require("../../middlewares/verifyAuth");
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.route('').get(book_controller_1.bookController.getBooks);
router.route('/create-book').post(verifyAuth_1.verifyAdmin, book_controller_1.bookController.createBook);
router
    .route('/:id')
    .get(book_controller_1.bookController.getBookById)
    .patch(verifyAuth_1.verifyAdmin, book_controller_1.bookController.updateBook)
    .delete(verifyAuth_1.verifyAdmin, book_controller_1.bookController.deleteBook);
router.route('/:id/category').get(book_controller_1.bookController.getBooksCategoryId);
exports.default = { bookRouter: router };
