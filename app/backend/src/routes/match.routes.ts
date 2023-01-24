import * as express from 'express';
import matchController from '../controllers/match.controller';
import { validateToken } from '../middlewares';

const matchRouter = express.Router();

// matchRouter.get('/matches', matchController.getMatchesByInProgress);
matchRouter.get('/', matchController.getAllMatches);
matchRouter.post('/', validateToken, matchController.createMatch);

export default matchRouter;
