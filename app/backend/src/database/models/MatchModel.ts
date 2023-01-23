import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  homeTeamId: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

}, {
  sequelize: db,
  timestamps: false,
  modelName: 'match',
  underscored: true });

Team.hasMany(Match, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

Team.hasMany(Match, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

Match.belongsTo(Team, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

Match.belongsTo(Team, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default Match;
