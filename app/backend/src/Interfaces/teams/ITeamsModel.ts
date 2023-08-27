import ITeams from './ITeams';

export default interface ITemsModel{
  findAllTeams(): Promise<ITeams[]>,
  findByIdTeams(id: ITeams['id']): Promise<ITeams | null>,
}
