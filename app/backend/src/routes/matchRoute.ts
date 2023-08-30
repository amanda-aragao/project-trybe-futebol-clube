import * as express from 'express';
import { Request, Response } from 'express';
import MatchesController from '../controllers/matchesController';

const router = express.Router();
const matchController = new MatchesController();

router.get('/', (req: Request, res: Response) => matchController.findAllMatches(req, res));

export default router;
