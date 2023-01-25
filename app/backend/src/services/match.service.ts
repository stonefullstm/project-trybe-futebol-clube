import sequelize from '../database/models';
import matchModel from '../database/models/MatchModel';
import teamModel from '../database/models/TeamModel';
import { IClassification, IMatch, IScore } from '../interfaces';

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
  const [classification] = await sequelize.query(`select t.team_name as name,
    sum((if(m.home_team_goals > m.away_team_goals,1,0))*3
    + if(m.home_team_goals = m.away_team_goals,1,0)) as totalPoints,
    count(m.home_team_id) as totalGames,
    sum(if(m.home_team_goals > m.away_team_goals,1,0)) as totalVictories,
    sum(if(m.home_team_goals = m.away_team_goals,1,0)) as totalDraws,
    sum(if(m.home_team_goals < m.away_team_goals,1,0)) as totalLosses,
    sum(m.home_team_goals) as goalsFavor,
    sum(m.away_team_goals) as goalsOwn,
    sum(m.home_team_goals-m.away_team_goals) as goalsBalance
    from matches as m INNER JOIN
    teams as t
    on m.home_team_id = t.id
    where m.in_progress = false
    group by t.team_name
    order by totalPoints desc, totalVictories desc,
    goalsBalance desc, goalsFavor desc, goalsOwn desc`);

  return classification as unknown as IClassification[];
};

const classificationAwayTeam = async (): Promise<IClassification[]> => {
  const [classification] = await sequelize.query(`select t.team_name as name,
    sum((if(m.away_team_goals > m.home_team_goals,1,0))*3
    + if(m.away_team_goals = m.home_team_goals,1,0)) as totalPoints,
    count(m.away_team_id) as totalGames,
    sum(if(m.away_team_goals > m.home_team_goals,1,0)) as totalVictories,
    sum(if(m.away_team_goals = m.home_team_goals,1,0)) as totalDraws,
    sum(if(m.away_team_goals < m.home_team_goals,1,0)) as totalLosses,
    sum(m.away_team_goals) as goalsFavor,
    sum(m.home_team_goals) as goalsOwn,
    sum(m.away_team_goals-m.home_team_goals) as goalsBalance
    from matches as m INNER JOIN
    teams as t
    on m.away_team_id = t.id
    where m.in_progress = false
    group by t.team_name
    order by totalPoints desc, totalVictories desc,
    goalsBalance desc, goalsFavor desc, goalsOwn desc`);

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
