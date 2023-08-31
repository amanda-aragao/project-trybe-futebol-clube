import { Request, Response } from 'express';

import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async findAllMatches(_req: Request, res: Response): Promise<Response | void> {
    const matches = await this.matchesService.findAllMatches();
    res.status(200).json(matches.data);
  }

  // public async matchesInProgress(_req: Request, res: Response): Promise<Response | void> {
  //   const matches = await this.matchesService.findAllMatches();
  //   res.status(200).json(matches.data);
  // }

  // public async matchesFinished(_req: Request, res: Response): Promise<Response | void> {

  // }
}
