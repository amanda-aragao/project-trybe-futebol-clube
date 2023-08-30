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
}
