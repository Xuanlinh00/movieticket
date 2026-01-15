import { Router } from "express";
import { RoomController } from "../controllers/room.controller";

const router = Router();

router.get('/', RoomController.getAll);

export default router;
