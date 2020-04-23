import { Router } from 'express';
import * as todoController from '../controllers/todo';

export const router: Router = Router({ mergeParams: true });

router.get('/todo', todoController.index); // /todo GET
router.post('/todo', todoController.create); // /todo POST
router.get('/todo/:id', todoController.show); // /todo/:id GET
router.put('/todo/:id', todoController.update); // /todo/:id PUT
router.delete('/todo/:id', todoController.destroy); // /todo/:id DELETE