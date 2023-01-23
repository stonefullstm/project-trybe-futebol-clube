import { Request, Response } from 'express';
import matchService from '../services/match.service';

const getAllMatches = async (req: Request, res: Response) => {
  const matches = await matchService.getAllMatches();
  return res.status(200).json(matches);
};

export default { getAllMatches };
