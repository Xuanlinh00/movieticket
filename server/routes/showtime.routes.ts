import { Router } from "express";
import { ShowtimeController } from "../controllers/showtime.controller";
import { authenticateToken, requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get('/', ShowtimeController.getAll);
router.post('/', authenticateToken, requireAdmin, ShowtimeController.create);
router.put('/:id', authenticateToken, requireAdmin, ShowtimeController.update);
router.delete('/:id', authenticateToken, requireAdmin, ShowtimeController.delete);

export default router;
