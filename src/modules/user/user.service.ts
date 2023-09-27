import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

const getAllUsers = async (): Promise<Partial<User>[]> => {
  const result = await prisma.user.findMany({
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

const getUserById = async (id: string): Promise<Partial<User | null>> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
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

const updateUser = async (id: string, payload: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
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

const deleteUser = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
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

const getProfile = async (id: string): Promise<Partial<User> | null> => {
  console.log(id);
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const userService = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile,
};
