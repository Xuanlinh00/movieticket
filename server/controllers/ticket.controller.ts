import { Request, Response } from "express";
import { storage } from "../storage";
import { insertTicketSchema } from "@shared/schema";

export class TicketController {
  // Lấy vé của người dùng
  static async getUserTickets(req: Request, res: Response) {
    try {
      const userId = req.user.userId;
      const tickets = await storage.getTicketsByUser(userId);
      
      // Bổ sung thông tin phim, suất chiếu và phòng chiếu cho vé
      const enrichedTickets = await Promise.all(
        tickets.map(async (ticket) => {
          try {
            const showtime = await storage.getShowtime(ticket.showtimeId);
            if (!showtime) {
              console.log(`Không tìm thấy suất chiếu ${ticket.showtimeId} cho vé ${ticket.id}`);
              return {
                ...ticket,
                customerInfo: typeof ticket.customerInfo === 'string' 
                  ? JSON.parse(ticket.customerInfo) 
                  : ticket.customerInfo,
                movie: null,
                showtime: null
              };
            }

            // Lấy thông tin phim với error handling
            let movie = null;
            try {
              movie = await storage.getMovie(showtime.movieId);
            } catch (movieError) {
              console.log(`Không tìm thấy phim ${showtime.movieId}:`, movieError);
            }

            // Lấy thông tin phòng và rạp với error handling
            let room = null;
            let cinema = null;
            try {
              room = await storage.getRoom(showtime.roomId);
              if (room) {
                cinema = await storage.getCinema(room.cinemaId);
              }
            } catch (roomError) {
              console.log(`Không tìm thấy phòng ${showtime.roomId}:`, roomError);
            }
            
            // Parse customerInfo nếu là string
            let customerInfo = ticket.customerInfo;
            if (typeof customerInfo === 'string') {
              try {
                customerInfo = JSON.parse(customerInfo);
              } catch (e) {
                console.log(`Lỗi parse customerInfo cho vé ${ticket.id}:`, e);
                customerInfo = null;
              }
            }
            
            return {
              ...ticket,
              customerInfo,
              movie,
              showtime: {
                ...showtime,
                room: room ? {
                  ...room,
                  cinema
                } : null
              }
            };
          } catch (ticketError) {
            console.error(`Lỗi xử lý vé ${ticket.id}:`, ticketError);
            // Trả về ticket với thông tin cơ bản nếu có lỗi
            return {
              ...ticket,
              customerInfo: typeof ticket.customerInfo === 'string' 
                ? JSON.parse(ticket.customerInfo) 
                : ticket.customerInfo,
              movie: null,
              showtime: null
            };
          }
        })
      );
      
      res.json(enrichedTickets);
    } catch (error) {
      console.error('Lỗi lấy vé người dùng:', error);
      res.status(500).json({ message: 'Không thể tải danh sách vé' });
    }
  }

  // Tạo đặt vé
  static async createBooking(req: Request, res: Response) {
    try {
      const { showtimeId, seats, totalPrice, paymentMethod, customerInfo } = req.body;
      
      // Lấy dữ liệu suất chiếu mới nhất
      const showtime = await storage.getShowtime(showtimeId);
      if (!showtime) {
        return res.status(404).json({ message: 'Không tìm thấy suất chiếu' });
      }

      console.log(`Kiểm tra ghế cho suất chiếu ${showtimeId}:`, seats);
      console.log(`Ghế còn trống:`, showtime.availableSeats);

      // Kiểm tra xem có ghế nào đã được đặt chưa
      const unavailableSeats = seats.filter((seat: string) => 
        !showtime.availableSeats?.includes(seat)
      );

      if (unavailableSeats.length > 0) {
        console.log(`Tìm thấy ghế không khả dụng:`, unavailableSeats);
        return res.status(400).json({ 
          message: 'Một số ghế không còn trống',
          unavailableSeats 
        });
      }

      // Kiểm tra lại bằng cách lấy tất cả vé đã đặt cho suất chiếu này
      const allTickets = await storage.getTickets();
      const existingTicketsForShowtime = allTickets.filter(t => t.showtimeId === showtimeId);
      const alreadyBookedSeats = existingTicketsForShowtime.flatMap(t => t.seats);
      
      const conflictingSeats = seats.filter((seat: string) => 
        alreadyBookedSeats.includes(seat)
      );

      if (conflictingSeats.length > 0) {
        console.log(`Tìm thấy ghế bị trùng:`, conflictingSeats);
        return res.status(400).json({ 
          message: 'Một số ghế đã được đặt',
          conflictingSeats 
        });
      }

      const ticketData = {
        userId: req.user.userId,
        showtimeId,
        seats,
        totalPrice,
        paymentMethod,
        customerInfo: JSON.stringify(customerInfo),
        status: 'confirmed',
        bookingCode: `TK${Date.now()}${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      };

      const ticket = await storage.createTicket(ticketData);
      
      // Cập nhật ghế còn trống
      const updatedAvailableSeats = showtime.availableSeats?.filter((seat: string) => 
        !seats.includes(seat)
      );
      
      await storage.updateShowtime(showtimeId, {
        availableSeats: updatedAvailableSeats
      });

      console.log(`Cập nhật suất chiếu ${showtimeId} ghế còn trống từ ${showtime.availableSeats?.length} xuống ${updatedAvailableSeats?.length}`);

      res.status(201).json(ticket);
    } catch (error) {
      console.error('Lỗi đặt vé:', error);
      const errorMessage = error instanceof Error ? error.message : 'Dữ liệu đặt vé không hợp lệ';
      res.status(400).json({ message: errorMessage });
    }
  }

  // Tạo vé
  static async create(req: Request, res: Response) {
    try {
      const ticketData = insertTicketSchema.parse({
        ...req.body,
        userId: req.user.userId,
        bookingCode: `TK${Date.now()}${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      });
      
      // Kiểm tra ghế còn trống
      const showtime = await storage.getShowtime(ticketData.showtimeId);
      if (!showtime) {
        return res.status(404).json({ message: 'Không tìm thấy suất chiếu' });
      }

      const unavailableSeats = ticketData.seats.filter(seat => 
        !showtime.availableSeats?.includes(seat)
      );

      if (unavailableSeats.length > 0) {
        return res.status(400).json({ 
          message: 'Một số ghế không còn trống',
          unavailableSeats 
        });
      }

      const ticket = await storage.createTicket(ticketData);
      
      // Cập nhật ghế còn trống
      const updatedAvailableSeats = showtime.availableSeats?.filter(seat => 
        !ticketData.seats.includes(seat)
      );
      
      await storage.updateShowtime(ticketData.showtimeId, {
        availableSeats: updatedAvailableSeats
      });

      res.status(201).json(ticket);
    } catch (error) {
      res.status(400).json({ message: 'Dữ liệu vé không hợp lệ' });
    }
  }

  // Cập nhật vé
  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      const ticket = await storage.getTicket(id);
      if (!ticket) {
        return res.status(404).json({ message: 'Không tìm thấy vé' });
      }

      // Kiểm tra xem người dùng có sở hữu vé hoặc là nhân viên/quản trị viên
      if (ticket.userId !== req.user.userId && req.user.role === 'user') {
        return res.status(403).json({ message: 'Truy cập bị từ chối' });
      }

      const updatedTicket = await storage.updateTicket(id, updates);
      res.json(updatedTicket);
    } catch (error) {
      res.status(400).json({ message: 'Không thể cập nhật vé' });
    }
  }

  // Lấy tất cả vé (quản trị viên/nhân viên)
  static async getAll(req: Request, res: Response) {
    try {
      const tickets = await storage.getTickets();
      
      // Bổ sung thông tin phim, suất chiếu và phòng chiếu cho vé
      const enrichedTickets = await Promise.all(
        tickets.map(async (ticket) => {
          try {
            const showtime = await storage.getShowtime(ticket.showtimeId);
            if (!showtime) {
              console.log(`Không tìm thấy suất chiếu ${ticket.showtimeId} cho vé ${ticket.id}`);
              return {
                ...ticket,
                customerInfo: typeof ticket.customerInfo === 'string' 
                  ? JSON.parse(ticket.customerInfo) 
                  : ticket.customerInfo,
                movie: null,
                showtime: null
              };
            }

            // Lấy thông tin phim với error handling
            let movie = null;
            try {
              movie = await storage.getMovie(showtime.movieId);
            } catch (movieError) {
              console.log(`Không tìm thấy phim ${showtime.movieId}:`, movieError);
            }

            // Lấy thông tin phòng và rạp với error handling
            let room = null;
            let cinema = null;
            try {
              room = await storage.getRoom(showtime.roomId);
              if (room) {
                cinema = await storage.getCinema(room.cinemaId);
              }
            } catch (roomError) {
              console.log(`Không tìm thấy phòng ${showtime.roomId}:`, roomError);
            }
            
            // Parse customerInfo nếu là string
            let customerInfo = ticket.customerInfo;
            if (typeof customerInfo === 'string') {
              try {
                customerInfo = JSON.parse(customerInfo);
              } catch (e) {
                console.log(`Lỗi parse customerInfo cho vé ${ticket.id}:`, e);
                customerInfo = null;
              }
            }
            
            return {
              ...ticket,
              customerInfo,
              movie,
              showtime: {
                ...showtime,
                room: room ? {
                  ...room,
                  cinema
                } : null
              }
            };
          } catch (ticketError) {
            console.error(`Lỗi xử lý vé ${ticket.id}:`, ticketError);
            // Trả về ticket với thông tin cơ bản nếu có lỗi
            return {
              ...ticket,
              customerInfo: typeof ticket.customerInfo === 'string' 
                ? JSON.parse(ticket.customerInfo) 
                : ticket.customerInfo,
              movie: null,
              showtime: null
            };
          }
        })
      );
      
      res.json(enrichedTickets);
    } catch (error) {
      console.error('Lỗi lấy danh sách vé:', error);
      res.status(500).json({ message: 'Không thể tải tất cả vé' });
    }
  }
}
