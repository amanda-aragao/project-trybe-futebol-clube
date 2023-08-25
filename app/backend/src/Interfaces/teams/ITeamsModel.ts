import ITeams from './ITeams';

interface IItemsModel{
  findAll(): Promise<ITeams[]>;
}
export default IItemsModel;
