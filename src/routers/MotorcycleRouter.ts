import 'express-async-errors';
import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
// import LoginFieldsMiddleware from '../middlewares/LoginFieldsMiddleware';
// import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/', MotorcycleController.create);
router.get('/', MotorcycleController.findAll);
router.get('/:id', MotorcycleController.findById);
router.put('/:id', MotorcycleController.updateById);

export default router;
