import ITeams from './ITeams';

export default interface ITemsModel{
  findAll(): Promise<ITeams[]>;
  findByIdTeams(id: ITeams['id']): Promise<ITeams | null>;
}
