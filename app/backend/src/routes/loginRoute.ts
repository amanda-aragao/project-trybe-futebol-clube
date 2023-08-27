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

export default router;
