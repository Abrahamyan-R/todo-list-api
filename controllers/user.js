import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { pick } from '../helpers/functions.js';
import { MONGO_ERROR_CODES } from '../constants/constants.js';


export const register = async (req, res, next) => {
  const userInfo = pick([
    'email',
    'password'
  ], req.body);

  try {
    const hash = await bcrypt.hash(userInfo.password, 10);

    await User.create({
      ...userInfo,
      password: hash,
    });

    res.status(200).json({ success: true });
  } catch (e) {
    if (e.code == MONGO_ERROR_CODES.DUPLICATE_KEY_ERROR) {
      return res.status(409).json({
        success: false,
        error: 'email is already taken',
      });
    }
    next(e)
  }
};

export const login = async (req, res, next) => {
  const userInfo = pick([
    'email',
    'password'
  ], req.body);

  const {
    JWT_SECRET,
    TOKEN_EXPIRATION_IN_MINUTES,
  } = process.env;

  try {
    const user = await User.findOne({ email: userInfo.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'wrong username or password'
      });
    }

    const isPasswordsMatches = await bcrypt.compare(userInfo.password, user.password);

    if (!isPasswordsMatches) {
      return res.status(404).json({
        success: false,
        error: 'wrong username or password'
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: 60 * TOKEN_EXPIRATION_IN_MINUTES
      }
    );

    res.status(200).json({
      success: true,
      token,
    });
  } catch (e) {
    next(e);
  }
};