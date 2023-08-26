import { Request, Response } from 'express';

import TeamsService from '../services/teamService';

export default class TeamController {
  constructor(private teamService = new TeamsService()) {}

  public async findAllTeams(_req: Request, res: Response) {
    const teams = await this.teamService.findAllTeams();
    res.status(200).json(teams.data);
  }

  public async findByIdTeams(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const teams = await this.teamService.findByIdTeams(Number(id));
    if (teams.status !== 'SUCCESSFUL') {
      return res.status(404).json(teams.data);
    }
    return res.status(200).json(teams.data);
  }
}
