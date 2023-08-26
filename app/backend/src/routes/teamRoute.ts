import * as express from 'express';
import { Request, Response } from 'express';
import TeamController from '../controllers/teamController';

const route = express.Router();
const teamController = new TeamController();

route.get('/', (req: Request, res: Response) => teamController.findAll(req, res));

export default route;
