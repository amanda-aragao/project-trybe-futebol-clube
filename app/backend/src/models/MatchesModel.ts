import Matches from '../database/models/Matches';
import IMatches from '../Interfaces/matches/IMatches';
import IMatchesModel from '../Interfaces/matches/IMatchesModel';
import Teams from '../database/models/Teams';

export default class MatchesModel implements IMatchesModel {
  constructor(
    private model = Matches,
  ) {}

  public async findAllMatches(): Promise<IMatches[]> {
    const userDB = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return userDB;
  }

  public async inProgressMatches(): Promise<IMatches[]> {
    const db = await this.findAllMatches();
    const matchesInProgress = db.filter((match) => match.inProgress === true);
    return matchesInProgress;
  }

  public async finishedMatches(): Promise<IMatches[]> {
    const db = await this.findAllMatches();
    const matchesFinished = db.filter((match) => match.inProgress === false);
    return matchesFinished;
  }

  public async editInProgressMatch(id: number): Promise<void | IMatches[]> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async updateMatchesInProgress(id: number, data: object): Promise<void | IMatches[]> {
    await this.model.update(data, { where: { id } });
  }
}
