import { DataTypes, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  declare id: number;
  declare clubName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'team',
  underscored: true });

export default Team;
