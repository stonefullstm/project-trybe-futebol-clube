import matchModel from '../database/models/MatchModel';
import teamModel from '../database/models/TeamModel';
import { IMatch } from '../interfaces';

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

export default { getAllMatches, getMatchesByInProgress, createMatch, finishMatch };
