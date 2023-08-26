import Teams from '../database/models/Teams';
import ITeams from '../Interfaces/teams/ITeams';
import ItemsModel from '../Interfaces/teams/ITeamsModel';

export class TeamsModel implements ItemsModel {
  private model = Teams;

  async findAll(): Promise<ITeams[]> {
    const db = await this.model.findAll();
    return db.map(({ id, teamName }) => ({ id, teamName }));
  }
}

export default TeamsModel;
