import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { TicketController } from "../controllers/ticket.controller";
import { authenticateToken, requireAdmin, requireStaff } from "../middleware/auth.middleware";

const router = Router();

// User management (admin only)
router.get('/users', authenticateToken, requireAdmin, UserController.getAll);
router.put('/users/:id', authenticateToken, requireAdmin, UserController.update);
router.delete('/users/:id', authenticateToken, requireAdmin, UserController.delete);

// Ticket management (staff and admin)
router.get('/tickets', authenticateToken, requireStaff, TicketController.getAll);
router.get('/all-tickets', authenticateToken, requireAdmin, TicketController.getAll);

export default router;
