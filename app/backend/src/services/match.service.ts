import sequelize from '../database/models';
import matchModel from '../database/models/MatchModel';
import teamModel from '../database/models/TeamModel';
import { IClassification, IMatch, IScore } from '../interfaces';
import { queryAwayTeam, queryHomeTeam } from './queries.matches';

const getAllMatches = async (): Promise<IMatch[]> => {
  const teams = await matchModel.findAll({
    include: [{ model: teamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: teamModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
  });
  return teams as unknown as IMatch[];
};

const getMatchesByInProgress = async (inProgress: boolean): Promise<IMatch[]> => {
  const teams = await matchModel.findAll({
    where: {
      inProgress,
    },
    include: [{ model: teamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: teamModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
  });
  return teams as unknown as IMatch[];
};

const createMatch = async (match: IMatch): Promise<IMatch> => {
  const newMatch = await matchModel.create({
    ...match, inProgress: true,
  }, { include: [{ model: teamModel, as: 'homeTeam' },
    { model: teamModel, as: 'awayTeam' }] });
  return newMatch as unknown as IMatch;
};

const finishMatch = async (id: number): Promise<number> => {
  const [updatedQty] = await matchModel.update(
    { inProgress: false },
    { where: { id } },
  );
  return updatedQty;
};

const setMatchScore = async (id: number, score: IScore): Promise<number> => {
  const [updatedQty] = await matchModel.update(
    { ...score },
    { where: { id } },
  );
  return updatedQty;
};

const classificationHomeTeam = async (): Promise<IClassification[]> => {
  const [classification] = await sequelize.query(queryHomeTeam);

  return classification as unknown as IClassification[];
};

const classificationAwayTeam = async (): Promise<IClassification[]> => {
  const [classification] = await sequelize.query(queryAwayTeam);

  return classification as unknown as IClassification[];
};

export default { getAllMatches,
  getMatchesByInProgress,
  createMatch,
  finishMatch,
  setMatchScore,
  classificationHomeTeam,
  classificationAwayTeam,
};
