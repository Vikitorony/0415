import { Router } from 'express';
import * as userController from '../controllers/user';

export const router: Router = Router({ mergeParams: true });

router.get('/user', userController.index); // /user GET
router.post('/user', userController.create); // /user POST               // Create
router.get('/user/:id', userController.show); // /user/:id GET           // Read
router.put('/user/:id', userController.update); // /user/:id PUT         // Update
router.delete('/user/:id', userController.destroy); // /user/:id DELETE  // Delete