import { Book, PrismaClient } from '@prisma/client';
import { IFilterOption } from './book.interface';

const prisma = new PrismaClient();

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  return result;
};

const getBooks = async (meta: any, filterOptions: IFilterOption) => {
  const { skip, take, orderBy } = meta;
  const queryOption: { [key: string]: any } = {};

  if (Object.keys(filterOptions).length) {
    const { search, maxPrice, minPrice, ...restOptions } = filterOptions;

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

  const result = await prisma.book.findMany({
    skip: Number(skip),
    take,
    orderBy,
    where: {
      ...queryOption,
    },
  });
  const totalCount = await prisma.book.count();
  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
  return {
    result,
    meta: { page: skip + 1, size: take, total: totalCount, totalPage },
  };
};

const getBookByCategoryId = async (id: string) => {
  const result = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
    include: {
      category: true,
    },
  });
  return result;
};
const getBookById = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateBook = async (
  id: string,
  data: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};
export const bookService = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBookByCategoryId,
};
