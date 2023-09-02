import ILeaderBoard from './ILeaderBoard';

export default interface ILeaderBoardModel{
  findAllLeaderBoard(): Promise<ILeaderBoard[] >,
}
