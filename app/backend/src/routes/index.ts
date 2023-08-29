import { Router } from 'express';
import teamRouter from './teamRoute';
import loginRouter from './loginRoute';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
export default router;
