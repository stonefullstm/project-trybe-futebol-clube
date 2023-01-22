import teamModel from '../database/models/TeamModel';
import { ITeam } from '../interfaces';

const getAllTeams = async (): Promise<ITeam[]> => {
  const teams = await teamModel.findAll();
  return teams as unknown as ITeam[];
};

export default { getAllTeams };
