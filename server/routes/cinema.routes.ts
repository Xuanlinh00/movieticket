import { Router } from "express";
import { CinemaController } from "../controllers/cinema.controller";
import { authenticateToken, requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get('/', CinemaController.getAll);
router.get('/:cinemaId/rooms', CinemaController.getRooms);
router.post('/', authenticateToken, requireAdmin, CinemaController.create);
router.put('/:id', authenticateToken, requireAdmin, CinemaController.update);
router.delete('/:id', authenticateToken, requireAdmin, CinemaController.delete);

export default router;
