import { Request, Response } from 'express';
import matchService from '../services/match.service';

const getAllMatches = async (req: Request, res: Response) => {
  let matches;
  if (req.query.inProgress) {
    const { inProgress } = req.query;
    const inProgressBool = (inProgress === 'true');
    matches = await matchService.getMatchesByInProgress(inProgressBool);
  } else {
    matches = await matchService.getAllMatches();
  }
  return res.status(200).json(matches);
};

const getMatchesByInProgress = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const inProgressBool = (inProgress === 'true');
  const matches = await matchService.getMatchesByInProgress(inProgressBool);
  return res.status(200).json(matches);
};

const createMatch = async (req: Request, res: Response) => {
  const { user, ...match } = req.body;
  const newMatch = await matchService.createMatch(match);
  if (newMatch) return res.status(201).json(newMatch);
  return res.status(500).json({ message: 'Match was not created' });
};

export default { getAllMatches, getMatchesByInProgress, createMatch };
