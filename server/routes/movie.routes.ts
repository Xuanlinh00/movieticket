import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";
import { authenticateToken, requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get('/', MovieController.getAll);
router.get('/:id', MovieController.getById);
router.get('/:id/reviews', MovieController.getReviews);
router.post('/', authenticateToken, requireAdmin, MovieController.create);
router.put('/:id', authenticateToken, requireAdmin, MovieController.update);
router.delete('/:id', authenticateToken, requireAdmin, MovieController.delete);

export default router;
