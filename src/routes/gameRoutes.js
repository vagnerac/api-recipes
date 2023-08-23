import { Router } from 'express';
import { gameController } from '../controllers/gameController.js';

const router = new Router();

// Create
router.post('/', gameController);
// Find all
// router.get('/', );
// // Update
// router.put('/:id', gameController.update);
// // Delete
// router.delete('/:id', gameController.delete);
// // Find one
// router.get('/:id', gameController.show);
export default router;
