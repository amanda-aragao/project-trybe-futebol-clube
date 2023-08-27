import IUser from './IUsers';

export default interface IUsersModel{
  loginUser(email: IUser['email']): Promise<IUser | null>;
}
