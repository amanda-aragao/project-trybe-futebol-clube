// import { NewEntity } from '../interfaces';
import Teams from '../database/models/Teams';
import ITeams from '../Interfaces/teams/ITeams';
import IItemsModel from '../Interfaces/teams/ITeamsModel';

export class TeamsModel implements IItemsModel {
  private model = Teams;

  async findAll(): Promise<ITeams[]> {
    const db = await this.model.findAll();
    return db.map(({ id, teamName }) => ({ id, teamName }));
  }
}

export default TeamsModel;
