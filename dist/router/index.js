"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../config"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const category_route_1 = __importDefault(require("../modules/category/category.route"));
const book_route_1 = __importDefault(require("../modules/book/book.route"));
const profileRoute_1 = __importDefault(require("../modules/user/profileRoute"));
const order_route_1 = __importDefault(require("../modules/order/order.route"));
const router = express_1.default.Router();
const defaultRoutes = [
    {
        path: '/auth',
        route: auth_route_1.default.authRouter,
    },
    {
        path: '/users',
        route: user_route_1.default.userRouter,
    },
    {
        path: '/categories',
        route: category_route_1.default.categoryRouter,
    },
    {
        path: '/books',
        route: book_route_1.default.bookRouter,
    },
    {
        path: '/profile',
        route: profileRoute_1.default.profileRouter,
    },
    {
        path: '/orders',
        route: order_route_1.default.orderRouter,
    },
];
defaultRoutes.forEach(route => {
    const apis = route.route.stack.map((path) => {
        return { path: path.route.path, methods: path.route.methods };
    });
    apis.map((api) => {
        console.log([
            api.methods,
            {
                route: `${config_1.default.server_url}${config_1.default.api_route}${route.path}${api.path}`,
            },
        ]);
    });
    router.use(route.path, route.route);
});
exports.default = router;
