import IMatches from './IMatches';

export default interface IMatchesModel{
  findAllMatches(): Promise<IMatches[] >,
  // matchesInProgress(inProgress: IMatches['inProgress']): Promise<IMatches | null >,
  // matchesFinished(inProgress: IMatches['inProgress']): Promise<IMatches | null >,
}
