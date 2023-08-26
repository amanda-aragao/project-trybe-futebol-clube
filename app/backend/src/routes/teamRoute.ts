import * as express from 'express';
import { Request, Response } from 'express';
import TeamController from '../controllers/teamController';

const route = express.Router();
const teamController = new TeamController();

route.get('/', (req: Request, res: Response) => teamController.findAllTeams(req, res));
route.get('/:id', (req: Request, res: Response) => teamController.findByIdTeams(req, res));

export default route;
