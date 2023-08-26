import TeamModel from '../models/TeamsModel';
import ITeams from '../Interfaces/teams/ITeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeamsModel from '../Interfaces/teams/ITeamsModel';

class TeamsService {
  constructor(private model: ITeamsModel = new TeamModel()) {}

  public async findAll(): Promise<ServiceResponse<ITeams[]>> {
    const db = await this.model.findAll();
    return { status: 'SUCCESSFUL', data: db };
  }
}

export default TeamsService;
