// import { IToken } from './IToken';
import IUser from './IUsers';

export default interface IUsersModel{
  loginUser(email: IUser['email']): Promise<IUser | null>;
  // verifyToken(token: IToken['token']): Promise<IToken>;
}
