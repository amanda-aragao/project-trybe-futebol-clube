import Teams from '../database/models/Teams';
import ITeams from '../Interfaces/teams/ITeams';
import IteamsModel from '../Interfaces/teams/ITeamsModel';

export class TeamsModel implements IteamsModel {
  constructor(private model = Teams) {}

  public async findAll(): Promise<ITeams[]> {
    const db = await this.model.findAll();
    return db.map(({ id, teamName }) => ({ id, teamName }));
  }

  public async findByIdTeams(id: ITeams['id']): Promise<ITeams | null> {
    const db = await this.model.findByPk(id);
    if (db == null) {
      return null;
    }
    const { teamName }: ITeams = db;
    return { id, teamName };
  }
}

export default TeamsModel;
