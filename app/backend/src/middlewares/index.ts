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
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

const validateMatch = (req: Request, res: Response, next: NextFunction) => {
  const { user, ...match } = req.body;
  if (match.homeTeamId === match.awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

export { validateLogin, validateToken, validateMatch };
