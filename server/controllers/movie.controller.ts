import { Request, Response } from "express";
import { storage } from "../storage";
import { insertMovieSchema } from "@shared/schema";

export class MovieController {
  // Lấy tất cả phim
  static async getAll(req: Request, res: Response) {
    try {
      const movies = await storage.getMovies();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: 'Không thể tải danh sách phim' });
    }
  }

  // Lấy phim theo ID
  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const movie = await storage.getMovie(id);
      if (!movie) {
        return res.status(404).json({ message: 'Không tìm thấy phim' });
      }
      res.json(movie);
    } catch (error) {
      res.status(500).json({ message: 'Không thể tải thông tin phim' });
    }
  }

  // Tạo phim mới
  static async create(req: Request, res: Response) {
    try {
      console.log('Dữ liệu phim nhận được:', req.body);
      const movieData = insertMovieSchema.parse(req.body);
      const movie = await storage.createMovie(movieData);
      res.status(201).json(movie);
    } catch (error: any) {
      console.error('Lỗi tạo phim:', error);
      res.status(400).json({ message: 'Dữ liệu phim không hợp lệ', error: error.message });
    }
  }

  // Cập nhật phim
  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const movie = await storage.updateMovie(id, updates);
      if (!movie) {
        return res.status(404).json({ message: 'Không tìm thấy phim' });
      }
      res.json(movie);
    } catch (error) {
      res.status(400).json({ message: 'Không thể cập nhật phim' });
    }
  }

  // Xóa phim
  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteMovie(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Không tìm thấy phim' });
      }
      res.json({ message: 'Xóa phim thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Không thể xóa phim' });
    }
  }

  // Lấy đánh giá của phim
  static async getReviews(req: Request, res: Response) {
    try {
      const movieId = parseInt(req.params.id);
      const reviews = await storage.getReviewsByMovie(movieId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Không thể tải đánh giá' });
    }
  }
}
