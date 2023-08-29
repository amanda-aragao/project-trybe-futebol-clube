import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UsersModel';
import IUsers from '../Interfaces/users/IUsers';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import IUsersModel from '../Interfaces/users/IUsersModel';
import JWT from '../utils/JWT';
import { IToken } from '../Interfaces/users/IToken';

export default class UsersService {
  constructor(
    private usersModel: IUsersModel = new UserModel(),
    private jwtService = JWT,
  ) {}

  public async loginUser(user: IUsers): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const userDB = await this.usersModel.loginUser(user.email);

    if (!userDB || !bcrypt.compareSync(user.password, userDB.password)) {
      return { status: 'NOT_FOUND', data: { message: 'Invalid email or password' } };
    }

    const token = this.jwtService.sign({
      email: userDB.email,
      password: userDB.password });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
