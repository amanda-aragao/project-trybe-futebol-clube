import { Request, Response } from 'express';

import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async findAllMatches(req: Request, res: Response): Promise<Response | void> {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const matches = await this.matchesService.inProgressMatches();
      return res.status(200).json(matches);
    }
    if (inProgress === 'false') {
      const matches = await this.matchesService.finishedMatches();
      return res.status(200).json(matches);
    }
    const matches = await this.matchesService.findAllMatches();
    res.status(200).json(matches.data);
  }
}
