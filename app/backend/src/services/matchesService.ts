import MatchesModel from '../models/MatchesModel';
import IMatches from '../Interfaces/matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchesModel from '../Interfaces/matches/IMatchesModel';

export default class MatchesService {
  constructor(private model: IMatchesModel = new MatchesModel()) {}

  public async findAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const db = await this.model.findAllMatches();
    return { status: 'SUCCESSFUL', data: db };
  }

  public async inProgressMatches(): Promise<IMatches[]> {
    const db = await this.model.findAllMatches();
    const matchesInProgress = db.filter((match) => match.inProgress === true);
    return matchesInProgress;
  }

  public async finishedMatches(): Promise<IMatches[]> {
    const db = await this.model.findAllMatches();
    const matchesFinished = db.filter((match) => match.inProgress === false);
    return matchesFinished;
  }

  public async editInProgressMatch(id: number): Promise<IMatches[] | void> {
    const matches = await this.model.editInProgressMatch(id);
    return matches;
  }

  public async updateMatchesInProgress(id: number, data: object): Promise<IMatches[] | void> {
    const matches = await this.model.updateMatchesInProgress(id, data);
    return matches;
  }
}
