import { User, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const signup = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

export const authService = {
  signup,
};
