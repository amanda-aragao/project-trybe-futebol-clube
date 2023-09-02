import { Request, Response } from 'express';

import LeaderBoardService from '../services/leaderBoardService';

export default class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  public async findAllLeaderBoard(req: Request, res: Response): Promise<Response | void> {
    const newMatch = await this.leaderBoardService.findAllLeaderBoard();

    return res.status(200).json(newMatch);
  }
}
