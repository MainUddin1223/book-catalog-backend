import express from 'express';
import { verifyAuth, verifyCustomer } from '../../middlewares/verifyAuth';
import { orderController } from './order.controller';
const router = express.Router();

router.route('/create-order').post(verifyCustomer, orderController.createOrder);
router.route('').get(verifyAuth, orderController.getOrders);
router.route('/:id').get(verifyAuth, orderController.getOrderById);

export default { orderRouter: router };
