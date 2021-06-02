import {
  body,
  param,
  query,
} from 'express-validator';


export const createTaskValidator = () => {
  return [
    body('title')
      .exists().withMessage('title is required')
      .isString().withMessage('title must be string'),
    body('date')
      .exists().withMessage('date is required')
      .isDate({
        format: 'DD/MM/YYYY',
        delimiters: ['/'],
        strictMode: true,
      })
  ];
};

export const deleteTaskValidator = () => {
  return [
    param('taskId')
      .isMongoId().withMessage('invalid task id')
  ];
};

export const getTasksListValidator = () => {
  return [
    query('skip')
      .optional()
      .isInt().withMessage('skip must be integer')
      .toInt(),
    query('limit')
      .optional()
      .isInt().withMessage('limit must be integer')
      .toInt(),
  ]
}