import {
  body,
} from 'express-validator';


export const registrationValidator = () => {
  return [
    body('email')
      .exists().withMessage('email is required')
      .isString().withMessage('email must be string')
      .isEmail().withMessage('invalid email'),
    body('password')
      .exists().withMessage('password is required')
      .isString().withMessage('password must be string')
      .isLength({ min: 8, max: 20 }).withMessage('password length must be in range [8: 20]'),
  ]
}

export const loginValidator = () => {
  return [
    body('email')
      .exists().withMessage('email is required')
      .isString().withMessage('email must be string')
      .isEmail().withMessage('invalid email'),
    body('password')
      .exists().withMessage('password is required')
      .isString().withMessage('password must be string')
  ]
}