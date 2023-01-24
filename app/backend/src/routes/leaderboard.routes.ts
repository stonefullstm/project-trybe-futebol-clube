import * as express from 'express';
import matchController from '../controllers/match.controller';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/home', matchController.classificationHomeTeam);

export default leaderboardRouter;
