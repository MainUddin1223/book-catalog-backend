import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../errorHandlers/catchAsync';
import { categoryService } from './category.service';
import sendResponse from '../../utils/sendRespnse';
import httpStatus from 'http-status';
import { categoryValidator } from './category.validator';

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = await categoryValidator.createCategorySchema.validate(
      req.body
    );
    if (error) {
      next(error);
    }
    const result = await categoryService.createCategory(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category created successfully',
      data: result,
    });
  }
);

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategory();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched successfully',
    data: result,
  });
});

const getCategroyById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await categoryService.getCategoryById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched successfully',
    data: result,
  });
});

const updateCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = await categoryValidator.updateCategorySchema.validate(
      req.body
    );
    if (error) {
      next(error);
    }
    const id = req.params.id;
    const result = await categoryService.updateCategory(req.body, id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category updated successfully',
      data: result,
    });
  }
);

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await categoryService.deleteCategory(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

export const categoryController = {
  getAllCategories,
  createCategory,
  getCategroyById,
  updateCategory,
  deleteCategory,
};
