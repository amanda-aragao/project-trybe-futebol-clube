import { Request, Response } from 'express';

import TeamsService from '../services/teamService';

export default class TeamController {
  constructor(private teamService = new TeamsService()) {}

  async findAll(_req: Request, res: Response) {
    const teams = await this.teamService.findAll();
    res.status(200).json(teams.data);
  }
}
