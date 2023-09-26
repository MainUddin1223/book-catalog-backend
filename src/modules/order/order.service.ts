import { Order, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createOrder = async (data: any): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });
  return result;
};

type IOrderedUser = {
  userId?: string;
  role: string;
};

const getOrders = async (data: IOrderedUser): Promise<Order[] | []> => {
  let result;
  if (data.role === 'admin') {
    result = await prisma.order.findMany({});
  } else {
    console.log('-----------------------------', data.userId);
    result = await prisma.order.findMany({
      where: {
        userId: data?.userId,
      },
    });
  }
  return result;
};

type IOrderCondition = {
  userId?: string;
  id: string;
};

const getOrderById = async (condition: IOrderCondition) => {
  const result = await prisma.order.findFirst({
    where: {
      ...condition,
    },
  });
  return result;
};

export const orderService = {
  createOrder,
  getOrders,
  getOrderById,
};
