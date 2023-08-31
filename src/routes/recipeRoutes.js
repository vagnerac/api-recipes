import { Router } from 'express';
import { recipeController } from '../controllers/recipeController.js';
import { APIRateLimit } from '../middleware/APIrateLimit.js';

const router = new Router();

// Create
router.post('/getRecipe', APIRateLimit, recipeController);
// Find all
// router.get('/', );
// // Update
// router.put('/:id', gameController.update);
// // Delete
// router.delete('/:id', gameController.delete);
// // Find one
// router.get('/:id', gameController.show);
export default router;
