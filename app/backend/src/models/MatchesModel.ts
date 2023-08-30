import Matches from '../database/models/Matches';
import IMatches from '../Interfaces/matches/IMatches';
import IMatchesModel from '../Interfaces/matches/IMatchesModel';
import Teams from '../database/models/Teams';

export default class MatchesModel implements IMatchesModel {
  constructor(
    private model = Matches,
    // private teams = Teams,
  ) {}

  public async findAllMatches(): Promise<IMatches[]> {
    console.log(Teams);
    const userDB = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return userDB;
  }
}
