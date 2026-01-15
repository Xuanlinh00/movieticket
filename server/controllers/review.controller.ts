import { Request, Response } from "express";
import { storage } from "../storage";
import { insertReviewSchema } from "@shared/schema";

export class ReviewController {
  // Lấy đánh giá theo phim
  static async getByMovie(req: Request, res: Response) {
    try {
      const movieId = parseInt(req.params.movieId);
      const reviews = await storage.getReviewsByMovie(movieId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Không thể tải danh sách đánh giá' });
    }
  }

  // Tạo đánh giá
  static async create(req: Request, res: Response) {
    try {
      const reviewData = insertReviewSchema.parse({
        ...req.body,
        userId: req.user.userId,
      });
      
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ message: 'Dữ liệu đánh giá không hợp lệ' });
    }
  }
}
