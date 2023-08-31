import IMatchesResponse from '../IMatchesResponse';
import IMatches from './IMatches';

export default interface IMatchesModel{
  findAllMatches(): Promise<IMatches[] >,
  inProgressMatches(): Promise<IMatches[] >,
  finishedMatches(): Promise<IMatches[] >,
  editInProgressMatch(id: number): Promise<IMatches[] | void>,
  updateMatchesInProgress(id: number, data: object): Promise<IMatches[] | void>,
  createMatch(data: IMatches):Promise< IMatchesResponse >,
}
