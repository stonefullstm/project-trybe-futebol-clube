import * as express from 'express';
import matchController from '../controllers/match.controller';
import { validateMatch, validateToken } from '../middlewares';

const matchRouter = express.Router();

// matchRouter.get('/matches', matchController.getMatchesByInProgress);
matchRouter.get('/', matchController.getAllMatches);
matchRouter.post('/', validateToken, validateMatch, matchController.createMatch);
matchRouter.patch('/:id/finish', matchController.finishMatch);

export default matchRouter;
