"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const verifyAuth_1 = require("../../middlewares/verifyAuth");
const router = express_1.default.Router();
router.route('').get(verifyAuth_1.verifyAdmin, user_controller_1.userController.getAllusers);
router
    .route('/:id')
    .get(verifyAuth_1.verifyAdmin, user_controller_1.userController.getUser)
    .patch(verifyAuth_1.verifyAdmin, user_controller_1.userController.updateUserById)
    .delete(verifyAuth_1.verifyAdmin, user_controller_1.userController.deleteUser);
exports.default = { userRouter: router };
