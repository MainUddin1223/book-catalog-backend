import express from 'express';
import { userController } from './user.controller';
import { verifyAuth } from '../../middlewares/verifyAuth';

const router = express.Router();

router.route('').get(verifyAuth, userController.getProfile);

export default { profileRouter: router };
