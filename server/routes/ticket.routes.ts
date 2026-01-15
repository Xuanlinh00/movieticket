import { Router } from "express";
import { TicketController } from "../controllers/ticket.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get('/', authenticateToken, TicketController.getUserTickets);
router.post('/', authenticateToken, TicketController.create);
router.put('/:id', authenticateToken, TicketController.update);

export default router;
