import * as express from 'express';
import matchController from '../controllers/match.controller';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/home', matchController.classificationHomeTeam);
leaderboardRouter.get('/away', matchController.classificationAwayTeam);

export default leaderboardRouter;
