import { Router } from 'express';
import teamRouter from './teamRoute';

const TeamRouter = Router();

TeamRouter.use('/teams', teamRouter);

export default TeamRouter;
