import TeamsModel from '../models/TeamsModel';
import ITemsModel from '../Interfaces/teams/ITeamsModel';
import MatchesModel from '../models/MatchesModel';
import IMatches from '../Interfaces/matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchesModel from '../Interfaces/matches/IMatchesModel';
import IMatchesResponse from '../Interfaces/IMatchesResponse';

export default class MatchesService {
  constructor(
    private model: IMatchesModel = new MatchesModel(),
    private modelTeams: ITemsModel = new TeamsModel(),
  ) {}

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

  public async createMatch(data: IMatches):
  Promise<IMatchesResponse> {
    if (data.homeTeamId === data.awayTeamId) {
      return { status: 422,
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const homeTeam = await this.modelTeams.findByIdTeams(data.homeTeamId);
    const awayTeam = await this.modelTeams.findByIdTeams(data.awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { status: 404, data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.model.createMatch({ ...data, inProgress: true });
    return { status: 201, data: newMatch.data };
  }
}
