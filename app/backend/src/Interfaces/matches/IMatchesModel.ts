import IMatches from './IMatches';

export default interface IMatchesModel{
  findAllMatches(): Promise<IMatches[] >,
  // matchesInProgressOurNot(inProgress?: string): Promise<IMatches[] | void >,
  inProgressMatches(): Promise<IMatches[] >,
  finishedMatches(): Promise<IMatches[] >,
}
