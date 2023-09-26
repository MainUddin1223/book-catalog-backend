import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../errorHandlers/catchAsync';
import { userService } from './user.service';
import sendResponse from '../../utils/sendRespnse';
import { userValidator } from './user.validator';

const getAllusers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userService.getUserById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const updateUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = await userValidator.updateUserSchema.validate(req.body);
    if (error) {
      next(error);
    }
    const id = req.params.id;
    const result = await userService.updateUser(id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  }
);

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userService.deleteUser(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req?.user?.userId;
  const result = await userService.getProfile(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

export const userController = {
  getAllusers,
  getUser,
  updateUserById,
  deleteUser,
  getProfile,
};
