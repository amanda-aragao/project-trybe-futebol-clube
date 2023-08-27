import * as express from 'express';
import { Request, Response } from 'express';
import TeamController from '../controllers/teamController';

const router = express.Router();
const teamController = new TeamController();

router.get('/', (req: Request, res: Response) => teamController.findAllTeams(req, res));
router.get('/:id', (req: Request, res: Response) => teamController.findByIdTeams(req, res));

export default router;
