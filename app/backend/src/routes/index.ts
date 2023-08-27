import { Router } from 'express';
import teamRouter from './teamRoute';

const TeamRouter = Router();
const loginRouter = Router();

TeamRouter.use('/teams', teamRouter);
loginRouter.use('/login', loginRouter);
export default TeamRouter;
