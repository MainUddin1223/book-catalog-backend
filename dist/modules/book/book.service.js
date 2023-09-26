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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.create({
        data,
    });
    return result;
});
const getBooks = (meta, filterOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip, take, orderBy } = meta;
    const queryOption = {};
    if (Object.keys(filterOptions).length) {
        const { search, maxPrice, minPrice } = filterOptions, restOptions = __rest(filterOptions, ["search", "maxPrice", "minPrice"]);
        if (search) {
            queryOption['OR'] = [
                {
                    title: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    author: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    genre: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            ];
        }
        if (maxPrice || minPrice) {
            if (maxPrice) {
                const price = { lte: maxPrice };
                queryOption['price'] = price;
            }
            if (minPrice) {
                const price = { gte: minPrice };
                queryOption['price'] = price;
            }
        }
        Object.entries(restOptions).forEach(([field, value]) => {
            queryOption[field] = value;
        });
    }
    const result = yield prisma.book.findMany({
        skip: Number(skip),
        take,
        orderBy,
        where: Object.assign({}, queryOption),
    });
    const totalCount = yield prisma.book.count();
    const totalPage = totalCount > take ? totalCount / Number(take) : 1;
    return {
        result,
        meta: { page: skip + 1, size: take, total: totalCount, totalPage },
    };
});
const getBookByCategoryId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.findMany({
        where: {
            categoryId: id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.bookService = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    getBookByCategoryId,
};
