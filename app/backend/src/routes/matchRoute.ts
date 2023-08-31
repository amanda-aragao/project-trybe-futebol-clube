import * as express from 'express';
import { Request, Response } from 'express';
import MatchesController from '../controllers/matchesController';
import validate from '../middlewares/Validations';

const router = express.Router();
const matchController = new MatchesController();

router.get('/', (req: Request, res: Response) => matchController.findAllMatches(req, res));
router.patch(
  '/:id/finish',
  validate.validateToken,
  (req: Request, res: Response) => matchController.editInProgressMatch(req, res),
);
router.patch(
  '/:id',
  validate.validateToken,
  (req: Request, res: Response) => matchController.updateMatchesInProgress(req, res),
);

export default router;
