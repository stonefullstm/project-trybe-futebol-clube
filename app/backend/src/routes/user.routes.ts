import * as express from 'express';
import userController from '../controllers/user.controller';
import validateLogin from '../middlewares';

const userRouter = express.Router();

userRouter.post('/', validateLogin, userController.getUserByEmail);

export default userRouter;
