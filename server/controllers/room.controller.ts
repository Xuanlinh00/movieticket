import { Request, Response } from "express";
import { storage } from "../storage";

export class RoomController {
  // Lấy tất cả phòng chiếu
  static async getAll(req: Request, res: Response) {
    try {
      const rooms = await storage.getRooms();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: 'Không thể tải danh sách phòng chiếu' });
    }
  }
}
