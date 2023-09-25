import { Request, Response } from 'express';
import catchAsync from '../../errorHandlers/catchAsync';
import sendResponse from '../../utils/sendRespnse';
import { bookService } from './book.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.createBook(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});
const getBookById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await bookService.getBookById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book fetched successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await bookService.updateBook(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await bookService.deleteBook(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

export const bookController = {
  createBook,
  getBookById,
  updateBook,
  deleteBook,
};
