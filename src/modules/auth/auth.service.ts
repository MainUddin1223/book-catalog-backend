import { User, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import ApiError from '../../errorHandlers/apiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../jwt';
import config from '../../config';
const prisma = new PrismaClient();

type ILoginPayload = {
  email: string;
  password: string;
};

const signup = async (payload: User): Promise<Partial<User>> => {
  const hash = bcrypt.hashSync(payload.password, 10);
  const data = { ...payload, password: hash };
  const result = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return result;
};

const signin = async (data: ILoginPayload) => {
  const isUserExist = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    );
  }
  const isPasswordMatched = await bcrypt.compare(
    data.password,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    );
  }
  const payload = { role: isUserExist.role, userId: isUserExist.id };
  const token = await jwtHelpers.createJwtToken(
    payload,
    config.jwt.jwt_access_secret as string,
    config.jwt.jwt_access_expires_in as string
  );
  return token;
};

export const authService = {
  signup,
  signin,
};
