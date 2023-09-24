import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.route('').get(userController.getAllusers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUserById)
  .delete(userController.deleteUser);

export default { userRouter: router };
