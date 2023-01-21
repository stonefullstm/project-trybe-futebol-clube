import * as express from 'express';
import userController from '../controllers/user.controller';
import { validateLogin, validateToken } from '../middlewares';

const userRouter = express.Router();

userRouter.post('/', validateLogin, userController.getUserByEmail);
userRouter.get('/validate', validateToken, userController.getRoleUser);

export default userRouter;
