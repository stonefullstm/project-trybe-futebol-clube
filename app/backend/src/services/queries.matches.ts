export const queryHomeTeam = `select t.team_name as name,
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
  goalsBalance desc, goalsFavor desc, goalsOwn desc`;

export const queryAwayTeam = `select t.team_name as name,
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
  goalsBalance desc, goalsFavor desc, goalsOwn desc`;
