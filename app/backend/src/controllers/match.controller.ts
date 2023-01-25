import { Request, Response } from 'express';
import { IClassification } from '../interfaces';
import matchService from '../services/match.service';
import teamService from '../services/team.service';

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

const createMatch = async (req: Request, res: Response) => {
  const { user, ...match } = req.body;
  if (!(await teamService.getTeamById(match.homeTeamId))
    || !(await teamService.getTeamById(match.awayTeamId))) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  const newMatch = await matchService.createMatch(match);
  if (newMatch) return res.status(201).json(newMatch);
  return res.status(500).json({ message: 'Match was not created' });
};

const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const finishedMatches = await matchService.finishMatch(Number(id));
  if (finishedMatches) {
    return res.status(200).json({ message: 'Finished' });
  }
  return res.status(500).json({ message: 'Not finished' });
};

const setMatchScore = async (req: Request, res: Response) => {
  const { id } = req.params;
  const settedMatches = await matchService.setMatchScore(Number(id), req.body);
  if (settedMatches) {
    return res.status(200).json({ message: 'Score was setted' });
  }
  return res.status(500).json({ message: 'Score was not setted' });
};

const calculateEfficiency = (array: IClassification[]) => {
  const finalArray = array.map((team: IClassification) => {
    const newTeam = { ...team };
    newTeam.efficiency = Number(((newTeam.totalPoints
      / (newTeam.totalGames * 3)) * 100).toFixed(2));
    return newTeam;
  });
  return finalArray;
};

const classificationHomeTeam = async (req: Request, res: Response) => {
  const classification = await matchService.classificationHomeTeam();
  const finalClassification = calculateEfficiency(classification);
  // classification.map((team: IClassification) => {
  //   const newTeam = { ...team };
  //   newTeam.efficiency = Number(((newTeam.totalPoints
  //     / (newTeam.totalGames * 3)) * 100).toFixed(2));
  //   return newTeam;
  // });
  return res.status(200).json(finalClassification);
};

const classificationAwayTeam = async (req: Request, res: Response) => {
  const classification = await matchService.classificationAwayTeam();
  const finalClassification = calculateEfficiency(classification);
  // classification.map((team: IClassification) => {
  //   const newTeam = { ...team };
  //   newTeam.efficiency = Number(((newTeam.totalPoints
  //     / (newTeam.totalGames * 3)) * 100).toFixed(2));
  //   return newTeam;
  // });
  return res.status(200).json(finalClassification);
};

export default { getAllMatches,
  createMatch,
  finishMatch,
  setMatchScore,
  classificationHomeTeam,
  classificationAwayTeam };
