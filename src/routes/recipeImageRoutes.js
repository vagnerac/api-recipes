import { Router } from 'express';
import { recipeImageController } from '../controllers/recipeImageController.js';

const router = new Router();

// Create
router.post('/getImage', recipeImageController);
// Find all
// router.get('/', );
// // Update
// router.put('/:id', gameController.update);
// // Delete
// router.delete('/:id', gameController.delete);
// // Find one
// router.get('/:id', gameController.show);
export default router;
