import express from 'express';
import { authController } from './auth.controller';

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.login);

export default { authRouter: router };
