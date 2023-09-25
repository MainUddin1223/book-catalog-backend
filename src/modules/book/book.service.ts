import { Book, PrismaClient } from '@prisma/client';
import { IMeta } from '../../utils/sendRespnse';

const prisma = new PrismaClient();

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
  });
  return result;
};

const getBooks = async (meta: IMeta) => {
  const { page, size } = meta;
  const result = await prisma.book.findMany({
    skip: Number(page) - 1,
    take: Number(size),
  });
  const totalCount = await prisma.book.count();
  const totalPage = totalCount / Number(size);
  console.log({ result, meta: { page, size, total: totalCount, totalPage } });
  return { result, meta: { page, size, total: totalCount, totalPage } };
};

// need to impl
// const getBookByCategoryId = async (id: string): Promise<Book | null> => {
//     const result = await prisma.book.findUnique({
//         where: {
//             id
//         },
//         include: {
//             category: true
//         }
//     })
//     return result
// }
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
};
