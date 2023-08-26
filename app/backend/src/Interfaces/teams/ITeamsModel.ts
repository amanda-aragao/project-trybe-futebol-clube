import ITeams from './ITeams';

export default interface ITemsModel{
  findAll(): Promise<ITeams[]>;
}
