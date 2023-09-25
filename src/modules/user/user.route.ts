import express from 'express';
import { userController } from './user.controller';
import { verifyAdmin } from '../../middlewares/verifyAuth';

const router = express.Router();

router.route('').get(verifyAdmin, userController.getAllusers);
router
  .route('/:id')
  .get(verifyAdmin, userController.getUser)
  .patch(verifyAdmin, userController.updateUserById)
  .delete(verifyAdmin, userController.deleteUser);

export default { userRouter: router };
