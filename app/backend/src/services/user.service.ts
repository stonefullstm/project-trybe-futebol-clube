import userModel from '../database/models/UserModel';
import { IUser } from '../interfaces';

const getUserByEmail = async (email: string): Promise<IUser> => {
  const user = await userModel.findOne({ where: { email } });
  return {
    id: user?.dataValues.id,
    username: user?.dataValues.username,
    role: user?.dataValues.role,
    email: user?.dataValues.email,
    password: user?.dataValues.password,
  };
};

export default { getUserByEmail };
