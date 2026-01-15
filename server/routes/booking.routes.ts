import { Router } from "express";
import { TicketController } from "../controllers/ticket.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post('/', authenticateToken, TicketController.createBooking);

export default router;
