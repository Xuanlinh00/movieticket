import { Request, Response } from "express";
import { storage } from "../storage";
import { insertShowtimeSchema } from "@shared/schema";

export class ShowtimeController {
  // Lấy tất cả suất chiếu
  static async getAll(req: Request, res: Response) {
    try {
      const showtimes = await storage.getShowtimes();

      // Bổ sung thông tin phim, phòng chiếu và rạp cho suất chiếu
      const enrichedShowtimes = await Promise.all(
        showtimes.map(async (showtime) => {
          const movie = await storage.getMovie(showtime.movieId);
          const room = await storage.getRoom(showtime.roomId);
          const cinema = room ? await storage.getCinema(room.cinemaId) : null;

          return {
            ...showtime,
            movie,
            room: room ? {
              ...room,
              cinema
            } : null
          };
        })
      );

      res.json(enrichedShowtimes);
    } catch (error) {
      res.status(500).json({ message: 'Không thể tải danh sách suất chiếu' });
    }
  }

  // Lấy suất chiếu theo phim
  static async getByMovie(req: Request, res: Response) {
    try {
      const movieId = parseInt(req.params.movieId);
      const showtimes = await storage.getShowtimesByMovie(movieId);

      // Bổ sung thông tin phim, phòng chiếu và rạp cho suất chiếu
      const enrichedShowtimes = await Promise.all(
        showtimes.map(async (showtime) => {
          const movie = await storage.getMovie(showtime.movieId);
          const room = await storage.getRoom(showtime.roomId);
          const cinema = room ? await storage.getCinema(room.cinemaId) : null;

          return {
            ...showtime,
            movie,
            room: room ? {
              ...room,
              cinema
            } : null
          };
        })
      );

      res.json(enrichedShowtimes);
    } catch (error) {
      res.status(500).json({ message: 'Không thể tải danh sách suất chiếu' });
    }
  }

  // Tạo mới suất chiếu
  static async create(req: Request, res: Response) {
    try {
      console.log('Dữ liệu suất chiếu nhận được:', req.body);
      const processedData = {
        ...req.body,
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime),
        price: req.body.price.toString()
      };
      const showtimeData = insertShowtimeSchema.parse(processedData);
      const showtime = await storage.createShowtime(showtimeData);
      res.status(201).json(showtime);
    } catch (error: any) {
      console.error('Lỗi tạo suất chiếu:', error);
      res.status(400).json({ message: 'Dữ liệu suất chiếu không hợp lệ', error: error.message });
    }
  }

  // Cập nhật suất chiếu
  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const processedData = {
        ...req.body,
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime),
        price: req.body.price.toString()
      };
      const showtime = await storage.updateShowtime(id, processedData);
      if (!showtime) {
        return res.status(404).json({ message: 'Không tìm thấy suất chiếu' });
      }
      res.json(showtime);
    } catch (error) {
      res.status(400).json({ message: 'Không thể cập nhật suất chiếu' });
    }
  }

  // Xóa suất chiếu
  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteShowtime(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Không tìm thấy suất chiếu' });
      }
      res.json({ message: 'Xóa suất chiếu thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Không thể xóa suất chiếu' });
    }
  }
}
