import * as express from 'express';
import teamController from '../controllers/team.controller';

const teamRouter = express.Router();

teamRouter.get('/', teamController.getAllTeams);

export default teamRouter;
