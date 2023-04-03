import 'express-async-errors';
import { Router } from 'express';
import CarController from '../Controllers/CarController';
// import LoginFieldsMiddleware from '../middlewares/LoginFieldsMiddleware';
// import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/', CarController.create);
router.get('/', CarController.findAll);
router.get('/:id', CarController.findById);
router.put('/:id', CarController.updateById);

export default router;
