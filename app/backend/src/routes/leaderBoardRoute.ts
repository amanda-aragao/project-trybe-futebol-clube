import * as express from 'express';
import { Request, Response } from 'express';
import LeaderBoardController from '../controllers/leaderBoardController';

const router = express.Router();
const leaderBoardController = new LeaderBoardController();

router.get('/home', (req: Request, res: Response) =>
  leaderBoardController.findAllLeaderBoard(req, res));
router.get('/away', (req: Request, res: Response) =>
  leaderBoardController.findAllLeaderBoard(req, res));

export default router;
