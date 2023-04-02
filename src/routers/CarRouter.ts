import 'express-async-errors';
import { Router } from 'express';
import CarController from '../Controllers/CarController';
// import LoginFieldsMiddleware from '../middlewares/LoginFieldsMiddleware';
// import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/', CarController.create);

export default router;
