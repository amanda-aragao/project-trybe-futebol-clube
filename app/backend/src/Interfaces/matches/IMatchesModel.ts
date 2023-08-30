import IMatches from './IMatches';

export default interface IMatchesModel{
  findAllMatches(): Promise<IMatches[] >;
}
