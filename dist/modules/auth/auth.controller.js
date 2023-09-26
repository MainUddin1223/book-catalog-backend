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
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../errorHandlers/catchAsync"));
const sendRespnse_1 = __importDefault(require("../../utils/sendRespnse"));
const auth_service_1 = require("./auth.service");
const auth_validator_1 = require("./auth.validator");
const apiError_1 = __importDefault(require("../../errorHandlers/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const signup = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield auth_validator_1.authValidator.signupValidator.validate(req.body);
    if (error) {
        throw new apiError_1.default(400, error.message);
    }
    const result = yield auth_service_1.authService.signup(req.body);
    (0, sendRespnse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User created successfully',
        data: result,
    });
}));
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield auth_validator_1.authValidator.signinValidator.validate(req.body);
    if (error) {
        throw new apiError_1.default(400, error.message);
    }
    const result = yield auth_service_1.authService.signin(req.body);
    res.send({
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User signin successfully!',
        token: result,
    });
}));
exports.authController = {
    signup,
    login,
};
