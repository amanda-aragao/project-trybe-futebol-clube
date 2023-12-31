import { Request, Response } from 'express';

import UsersService from '../services/usersService';

export default class UsersController {
  constructor(private usersService = new UsersService()) {}

  public async loginUser(req: Request, res: Response): Promise<Response | void> {
    const users = await this.usersService.loginUser(req.body);

    if (users.status !== 'SUCCESSFUL') {
      return res.status(401).json(users.data);
    }
    return res.status(200).json(users.data);
  }

  public async userRole(req: Request, res: Response): Promise<Response | void > {
    const { email } = req.body.user;
    const users = await this.usersService.userRole(email);

    if (users.status !== 'SUCCESSFUL') {
      return res.status(401).json(users.data);
    }
    return res.status(200).json(users.data);
  }
}
