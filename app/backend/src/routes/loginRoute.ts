import * as express from 'express';
import { Request, Response } from 'express';
import UserController from '../controllers/userController';
import validate from '../middlewares/Validations';

const router = express.Router();
const userController = new UserController();

router.post(
  '/',
  validate.validateLoginUser,
  (req: Request, res: Response) => userController.loginUser(req, res),
);

router.get(
  '/role',
  validate.validateToken,
  (req: Request, res: Response) => userController.userRole(req, res),
);

export default router;
