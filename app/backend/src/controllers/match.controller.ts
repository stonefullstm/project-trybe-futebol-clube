import { Request, Response } from 'express';
import { IClassification } from '../interfaces';
import matchService from '../services/match.service';
import teamService from '../services/team.service';
import sortLeaderboard from './sortLeaderboard';

const calculateEfficiency = (array: IClassification[]) => {
  const finalArray = array.map((team: IClassification) => {
    const newTeam = { ...team };
    newTeam.efficiency = Number(((newTeam.totalPoints
      / (newTeam.totalGames * 3)) * 100).toFixed(2));
    return newTeam;
  });
  return finalArray;
};

const joinClassifications = (arrayHome: IClassification[], arrayAway: IClassification[])
: IClassification[] =>
  arrayHome.map((home: IClassification) => {
    const homeTeam = { ...home };
    const awayTeam = arrayAway
      .find((away: IClassification) => away.name === home.name);
    if (awayTeam) {
      homeTeam.totalPoints += awayTeam.totalPoints;
      homeTeam.totalGames += awayTeam.totalGames;
      homeTeam.totalVictories += awayTeam.totalVictories;
      homeTeam.totalDraws += awayTeam.totalDraws;
      homeTeam.totalLosses += awayTeam.totalLosses;
      homeTeam.goalsFavor += awayTeam.goalsFavor;
      homeTeam.goalsOwn += awayTeam.goalsOwn;
      homeTeam.goalsBalance += awayTeam.goalsBalance;
      homeTeam.efficiency = Number(((homeTeam.totalPoints
        / (homeTeam.totalGames * 3)) * 100).toFixed(2));
    }
    return homeTeam;
  });

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

const classificationHomeTeam = async (_req: Request, res: Response) => {
  const classification = await matchService.classificationHomeTeam();
  const finalClassification = calculateEfficiency(classification);
  return res.status(200).json(finalClassification);
};

const classificationAwayTeam = async (_req: Request, res: Response) => {
  const classification = await matchService.classificationAwayTeam();
  const finalClassification = calculateEfficiency(classification);
  return res.status(200).json(finalClassification);
};

const classificationAllTeams = async (_req: Request, res: Response) => {
  const classHomeTeam = await matchService.classificationHomeTeam();
  const classAwayTeam = await matchService.classificationAwayTeam();
  const finalClassification = sortLeaderboard(joinClassifications(classHomeTeam, classAwayTeam));
  res.status(200).json(finalClassification);
};

export default { getAllMatches,
  createMatch,
  finishMatch,
  setMatchScore,
  classificationHomeTeam,
  classificationAwayTeam,
  classificationAllTeams };
