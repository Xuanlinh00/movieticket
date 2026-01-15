import { Express } from "express";
import { createServer, Server } from "http";
import authRoutes from "./auth.routes";
import movieRoutes from "./movie.routes";
import cinemaRoutes from "./cinema.routes";
import showtimeRoutes from "./showtime.routes";
import ticketRoutes from "./ticket.routes";
import bookingRoutes from "./booking.routes";
import adminRoutes from "./admin.routes";
import promotionRoutes from "./promotion.routes";
import reviewRoutes from "./review.routes";
import roomRoutes from "./room.routes";
import { ShowtimeController } from "../controllers/showtime.controller";
// Import swagger docs để bao gồm trong build
import "../swagger-docs";

export function registerRoutes(app: Express): Server {
  // Endpoint kiểm tra sức khỏe
  app.get('/api/health', (req, res) => {
    res.status(200).json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      service: 'MiniCinema API',
      version: '1.0.0'
    });
  });

  // Đăng ký tất cả routes
  app.use('/api/auth', authRoutes);
  app.use('/api/movies', movieRoutes);
  app.use('/api/cinemas', cinemaRoutes);
  app.use('/api/showtimes', showtimeRoutes);
  app.use('/api/tickets', ticketRoutes);
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/promotions', promotionRoutes);
  app.use('/api/reviews', reviewRoutes);
  app.use('/api/rooms', roomRoutes);

  // Route đặc biệt cho suất chiếu theo phim
  app.get('/api/movies/:movieId/showtimes', ShowtimeController.getByMovie);

  const httpServer = createServer(app);
  return httpServer;
}
