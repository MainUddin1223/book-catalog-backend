import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { jwtHelpers } from '../jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const verifyAuthWithRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_access_secret as string
      );
      req.user = decoded;
      const isUserExist = await prisma.user.findUnique({
        where: {
          id: req?.user?.id,
        },
      });
      if (!isUserExist || !allowedRoles.includes(req.user?.role)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

const verifyAuth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_access_secret as string
      );
      req.user = decoded;
      const isUserExist = await prisma.user.findUnique({
        where: {
          id: req?.user?.id,
        },
      });
      if (!isUserExist) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

const verifyAdmin = verifyAuthWithRole(['admin']);
const verifyCustomer = verifyAuthWithRole(['customer']);

export { verifyAdmin, verifyCustomer, verifyAuth };
