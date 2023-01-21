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

const getUserById = async (id: number): Promise<IUser> => {
  const user = await userModel.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  return user as unknown as IUser;
};

export default { getUserByEmail, getUserById };
