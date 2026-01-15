import { Request, Response } from "express";
import { storage } from "../storage";
import { insertCinemaSchema } from "@shared/schema";

export class CinemaController {
  // Lấy tất cả rạp chiếu
  static async getAll(req: Request, res: Response) {
    try {
      const cinemas = await storage.getCinemas();
      res.json(cinemas);
    } catch (error) {
      res.status(500).json({ message: 'Không thể tải danh sách rạp chiếu' });
    }
  }

  // Tạo mới rạp chiếu
  static async create(req: Request, res: Response) {
    try {
      const cinemaData = insertCinemaSchema.parse(req.body);
      const cinema = await storage.createCinema(cinemaData);
      res.status(201).json(cinema);
    } catch (error) {
      res.status(400).json({ message: 'Dữ liệu rạp chiếu không hợp lệ' });
    }
  }

  // Cập nhật rạp chiếu
  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const cinema = await storage.updateCinema(id, updates);
      if (!cinema) {
        return res.status(404).json({ message: 'Không tìm thấy rạp chiếu' });
      }
      res.json(cinema);
    } catch (error) {
      res.status(400).json({ message: 'Không thể cập nhật rạp chiếu' });
    }
  }

  // Xóa rạp chiếu
  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteCinema(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Không tìm thấy rạp chiếu' });
      }
      res.json({ message: 'Xóa rạp chiếu thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Không thể xóa rạp chiếu' });
    }
  }

  // Lấy danh sách phòng chiếu theo rạp
  static async getRooms(req: Request, res: Response) {
    try {
      const cinemaId = parseInt(req.params.cinemaId);
      const rooms = await storage.getRoomsByCinema(cinemaId);
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: 'Không thể tải danh sách phòng chiếu' });
    }
  }
}
