import express from 'express';

import * as UserController from '../controllers/user.js';
import * as UserValidator from '../validators/user.js';
import { validate } from '../middlewares/validate.js';


const router = express.Router();

router.post(
  '/register',
  UserValidator.registrationValidator(),
  validate,
  UserController.register
);

router.post(
  '/login',
  UserValidator.loginValidator(),
  validate,
  UserController.login,
);

export default router;