import { Request, Response } from 'express';
import catchAsync from '../../errorHandlers/catchAsync';
import { orderService } from './order.service';
import sendResponse from '../../utils/sendRespnse';
import httpStatus from 'http-status';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?.userId;
  const result = await orderService.createOrder({ ...req.body, userId: id });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getOrders({
    role: req.user?.role,
    userId: req.user?.userId,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});
const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const userRole = req.user?.role;
  let result;
  if (userRole === 'admin') {
    result = await orderService.getOrderById({ id });
  } else {
    result = await orderService.getOrderById({ id, userId: req.user?.userId });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fatched successfully',
    data: result,
  });
});

export const orderController = {
  createOrder,
  getOrders,
  getOrderById,
};
