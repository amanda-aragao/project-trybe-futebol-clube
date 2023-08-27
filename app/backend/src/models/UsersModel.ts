import Users from '../database/models/Users';
import IUser from '../Interfaces/users/IUsers';
import IUsersModel from '../Interfaces/users/IUsersModel';

export class UsersModel implements IUsersModel {
  constructor(private model = Users) {}

  public async loginUser(email: IUser['email']): Promise<IUser | null> {
    const userDB = await this.model.findOne({ where: { email } });
    if (!userDB) {
      return null;
    }
    const { id, username, role, password } = userDB;
    return { id, username, role, email, password };
  }
}

export default UsersModel;
