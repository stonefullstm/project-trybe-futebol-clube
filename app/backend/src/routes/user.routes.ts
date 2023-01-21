import * as express from 'express';
import userController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/', userController.getUserByEmail);
// userRouter.get('/', (req, res) => res.json({ ok: true }));

export default userRouter;
