import { Request, Response } from 'express';
import catchAsync from '../../errorHandlers/catchAsync';
import sendResponse from '../../utils/sendRespnse';
import { authService } from './auth.service';
import { authValidator } from './auth.validator';
import ApiError from '../../errorHandlers/apiError';

const signup = catchAsync(async (req: Request, res: Response) => {
  const { error } = await authValidator.createUserValidatorSchema.validate(
    req.body
  );
  if (error) {
    throw new ApiError(400, error.message);
  }
  const result = await authService.signup(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export const authController = {
  signup,
};
