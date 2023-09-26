"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const catchAsync_1 = __importDefault(require("../../errorHandlers/catchAsync"));
const order_service_1 = require("./order.service");
const sendRespnse_1 = __importDefault(require("../../utils/sendRespnse"));
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield order_service_1.orderService.createOrder(Object.assign(Object.assign({}, req.body), { userId: id }));
    (0, sendRespnse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order created successfully',
        data: result,
    });
}));
const getOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const result = yield order_service_1.orderService.getOrders({
        role: (_b = req.user) === null || _b === void 0 ? void 0 : _b.role,
        userId: (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId,
    });
    (0, sendRespnse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders retrieved successfully',
        data: result,
    });
}));
const getOrderById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const id = req.params.id;
    const userRole = (_d = req.user) === null || _d === void 0 ? void 0 : _d.role;
    let result;
    if (userRole === 'admin') {
        result = yield order_service_1.orderService.getOrderById({ id });
    }
    else {
        result = yield order_service_1.orderService.getOrderById({ id, userId: (_e = req.user) === null || _e === void 0 ? void 0 : _e.userId });
    }
    (0, sendRespnse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order fatched successfully',
        data: result,
    });
}));
exports.orderController = {
    createOrder,
    getOrders,
    getOrderById,
};
