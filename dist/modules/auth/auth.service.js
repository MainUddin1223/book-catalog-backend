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
exports.authService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const apiError_1 = __importDefault(require("../../errorHandlers/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwt_1 = require("../../jwt");
const config_1 = __importDefault(require("../../config"));
const prisma = new client_1.PrismaClient();
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = bcrypt_1.default.hashSync(payload.password, 10);
    const data = Object.assign(Object.assign({}, payload), { password: hash });
    const result = yield prisma.user.create({
        data,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return result;
});
const signin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma.user.findFirst({
        where: {
            email: data.email,
        },
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(data.password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new apiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }
    const payload = { role: isUserExist.role, userId: isUserExist.id };
    const token = yield jwt_1.jwtHelpers.createJwtToken(payload, config_1.default.jwt.jwt_access_secret, config_1.default.jwt.jwt_access_expires_in);
    return token;
});
exports.authService = {
    signup,
    signin,
};
