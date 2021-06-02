import express from 'express';

import * as TaskController from '../controllers/task.js';
import * as TaskValidator from '../validators/task.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validate } from '../middlewares/validate.js';


const router = express.Router();

router.post(
  '/',
  authenticate,
  TaskValidator.createTaskValidator(),
  validate,
  TaskController.createTask,
);

router.get(
  '/',
  authenticate,
  TaskValidator.getTasksListValidator(),
  validate,
  TaskController.getTasksList,
);

router.delete(
  '/:taskId',
  authenticate,
  TaskValidator.deleteTaskValidator(),
  validate,
  TaskController.deleteTask,
);

export default router;