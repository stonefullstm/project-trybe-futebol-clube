import { IClassification } from '../interfaces';

export default (array: IClassification[])
: IClassification[] => array.sort((a, b) => {
  if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
  if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
  if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
  return b.goalsFavor - a.goalsFavor;
  // desnecessário
  // return a.goalsOwn - b.goalsOwn;
});
