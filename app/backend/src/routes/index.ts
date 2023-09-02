import { Router } from 'express';
import teamRouter from './teamRoute';
import loginRouter from './loginRoute';
import matchRouter from './matchRoute';
import leaderBoardRouter from './leaderBoardRoute';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
