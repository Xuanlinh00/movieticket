import { Request, Response } from "express";
import { storage } from "../storage";

export class PromotionController {
  // Lấy tất cả khuyến mãi
  static async getAll(req: Request, res: Response) {
    try {
      const promotions = await storage.getPromotions();
      res.json(promotions);
    } catch (error) {
      res.status(500).json({ error: "Không thể tải danh sách khuyến mãi" });
    }
  }

  // Lấy khuyến mãi đang hoạt động
  static async getActive(req: Request, res: Response) {
    try {
      const promotions = await storage.getActivePromotions();
      res.json(promotions);
    } catch (error) {
      res.status(500).json({ error: "Không thể tải danh sách khuyến mãi đang hoạt động" });
    }
  }

  // Lấy khuyến mãi theo ID
  static async getById(req: Request, res: Response) {
    try {
      const promotion = await storage.getPromotion(parseInt(req.params.id));
      if (!promotion) {
        return res.status(404).json({ error: "Không tìm thấy khuyến mãi" });
      }
      res.json(promotion);
    } catch (error) {
      res.status(500).json({ error: "Không thể tải thông tin khuyến mãi" });
    }
  }

  // Kiểm tra mã khuyến mãi
  static async validate(req: Request, res: Response) {
    try {
      const { code, totalPrice } = req.body;
      const promotion = await storage.getPromotionByCode(code);
      
      if (!promotion) {
        return res.status(404).json({ error: "Không tìm thấy mã khuyến mãi" });
      }

      if (promotion.status !== "active") {
        return res.status(400).json({ error: "Mã khuyến mãi không còn hoạt động" });
      }

      const now = new Date();
      if (now < promotion.startDate || now > promotion.endDate) {
        return res.status(400).json({ error: "Mã khuyến mãi đã hết hạn" });
      }

      if (promotion.usageLimit && (promotion.currentUsage || 0) >= promotion.usageLimit) {
        return res.status(400).json({ error: "Mã khuyến mãi đã hết lượt sử dụng" });
      }

      if (promotion.minPurchase && totalPrice < parseFloat(promotion.minPurchase)) {
        return res.status(400).json({ error: "Chưa đạt giá trị đơn hàng tối thiểu" });
      }

      let discount = 0;
      if (promotion.discountType === "percentage") {
        discount = (totalPrice * parseFloat(promotion.discountValue)) / 100;
        if (promotion.maxDiscount && discount > parseFloat(promotion.maxDiscount)) {
          discount = parseFloat(promotion.maxDiscount);
        }
      } else {
        discount = parseFloat(promotion.discountValue);
      }

      res.json({
        code: promotion.code,
        discount,
        description: promotion.description,
      });
    } catch (error) {
      res.status(500).json({ error: "Không thể kiểm tra mã khuyến mãi" });
    }
  }
}
