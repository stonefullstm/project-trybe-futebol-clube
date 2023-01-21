import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const user = jwt.verify(token, secret as string);
    req.body.user = user;
    next();
  } catch (e) {
    return res.status(400).json({ message: 'Expired or invalid token' });
  }
};

export { validateLogin, validateToken };
