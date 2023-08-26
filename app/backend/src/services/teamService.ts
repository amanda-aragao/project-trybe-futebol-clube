import TeamModel from '../models/TeamsModel';
import ITeams from '../Interfaces/teams/ITeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeamsModel from '../Interfaces/teams/ITeamsModel';

class TeamsService {
  constructor(private model: ITeamsModel = new TeamModel()) {}

  public async findAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const db = await this.model.findAll();
    return { status: 'SUCCESSFUL', data: db };
  }

  public async findByIdTeams(id: number): Promise<ServiceResponse<ITeams>> {
    const idTeam = await this.model.findByIdTeams(id);
    if (!idTeam) {
      return { status: 'NOT_FOUND', data: { message: 'Sorry i can\'t find id the teams' } };
    }
    const { teamName } = idTeam as ITeams;

    return { status: 'SUCCESSFUL', data: { id, teamName } };
  }
}

export default TeamsService;
