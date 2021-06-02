import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';


export const authenticate = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({
      message: 'specify token'
    })
  };

  token = token.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(400).json({
        message: 'User does not exist'
      });
    }

    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
}