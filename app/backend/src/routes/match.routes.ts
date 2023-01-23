import * as express from 'express';
import matchController from '../controllers/match.controller';

const matchRouter = express.Router();

matchRouter.get('/', matchController.getAllMatches);

export default matchRouter;
