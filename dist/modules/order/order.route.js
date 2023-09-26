"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAuth_1 = require("../../middlewares/verifyAuth");
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.route('/create-order').post(verifyAuth_1.verifyCustomer, order_controller_1.orderController.createOrder);
router.route('').get(verifyAuth_1.verifyAuth, order_controller_1.orderController.getOrders);
router.route('/:id').get(verifyAuth_1.verifyAuth, order_controller_1.orderController.getOrderById);
exports.default = { orderRouter: router };
