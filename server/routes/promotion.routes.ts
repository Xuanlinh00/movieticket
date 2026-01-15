import { Router } from "express";
import { PromotionController } from "../controllers/promotion.controller";

const router = Router();

router.get('/', PromotionController.getAll);
router.get('/active', PromotionController.getActive);
router.get('/:id', PromotionController.getById);
router.post('/validate', PromotionController.validate);

export default router;
