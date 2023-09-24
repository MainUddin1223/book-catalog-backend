import { Request, Response } from 'express';
import catchAsync from '../../errorHandlers/catchAsync';
import { userService } from './user.service';
import sendResponse from '../../utils/sendRespnse';

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
    message: 'Users retrieved successfully',
    data: result,
  });
});

const updateUserById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userService.updateUser(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

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

export const userController = {
  getAllusers,
  getUser,
  updateUserById,
  deleteUser,
};