import * as bcrypt from 'bcryptjs';

import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import userService from '../services/user.service';

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const getUserByEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userService.getUserByEmail(email);
  if (!user || !user.id) {
    return res.status(401).json({
      message: 'Incorrect email or password',
    });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  const userData = { id: user.id, email };
  const jwtConfig = { expiresIn: '1d' };
  const token = jwt.sign(userData, secret as string, jwtConfig);
  res.status(200).json({ token });
};

const getRoleUser = async (req: Request, res: Response) => {
  const { id } = req.body.user;
  const user = await userService.getUserById(Number(id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.status(200).json({ role: user.role });
};

export default { getUserByEmail, getRoleUser };
