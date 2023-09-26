"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (data) => {
    const { page = 1, size = 100, sortBy = 'createdAt', sortOrder = 'desc', } = data;
    const sortOption = {
        [sortBy]: sortOrder,
    };
    const options = {
        ['skip']: (Number(page) - 1) * Number(size),
        ['take']: Number(size),
        ['orderBy']: sortOption,
    };
    return options;
};
exports.pagination = pagination;
