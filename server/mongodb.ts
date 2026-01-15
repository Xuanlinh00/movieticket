import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import { 
  User, InsertUser, Movie, InsertMovie, Cinema, InsertCinema, 
  Room, InsertRoom, Showtime, InsertShowtime, Ticket, InsertTicket,
  Review, InsertReview, Promotion, InsertPromotion 
} from '@shared/schema';
import { IStorage } from './storage';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export class MongoStorage implements IStorage {
  private client: MongoClient;
  private db: Db;
  private users: Collection;
  private movies: Collection;
  private cinemas: Collection;
  private rooms: Collection;
  private showtimes: Collection;
  private tickets: Collection;
  private reviews: Collection;
  private promotions: Collection;

  constructor() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    console.log('MongoDB URI loaded:', uri ? 'URI exists' : 'URI missing');
    
    this.client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
      connectTimeoutMS: 10000,
      socketTimeoutMS: 0,
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 30000,
      waitQueueTimeoutMS: 10000,
    });
  }

  async connect(): Promise<void> {
    try {
      console.log('Connecting to MongoDB...');
      
      // Test connection first
      await this.client.connect();
      await this.client.db('admin').command({ ping: 1 });
      console.log('MongoDB ping successful');
      
      this.db = this.client.db('cinemabook');
      console.log('Database selected');
      
      // Initialize collections
      this.users = this.db.collection('users');
      this.movies = this.db.collection('movies');
      this.cinemas = this.db.collection('cinemas');
      this.rooms = this.db.collection('rooms');
      this.showtimes = this.db.collection('showtimes');
      this.tickets = this.db.collection('tickets');
      this.reviews = this.db.collection('reviews');
      this.promotions = this.db.collection('promotions');
      console.log('Collections initialized');

      // Run initialization in background to avoid blocking
      setImmediate(() => {
        this.initializeData().catch(err => console.log('Data initialization completed'));
      });
      
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  private async createIndexes(): Promise<void> {
    try {
      // Create unique indexes
      await this.users.createIndex({ email: 1 }, { unique: true });
      await this.users.createIndex({ username: 1 }, { unique: true });
      await this.promotions.createIndex({ code: 1 }, { unique: true });
      
      // Create other indexes for performance
      await this.movies.createIndex({ status: 1 });
      await this.showtimes.createIndex({ movieId: 1 });
      await this.showtimes.createIndex({ roomId: 1 });
      await this.showtimes.createIndex({ startTime: 1 });
      await this.tickets.createIndex({ userId: 1 });
      await this.tickets.createIndex({ showtimeId: 1 });
      await this.reviews.createIndex({ movieId: 1 });
      await this.reviews.createIndex({ userId: 1 });
    } catch (error) {
      console.log('Index creation completed with some existing indexes');
    }
  }

  private async initializeData(): Promise<void> {
    const userCount = await this.users.countDocuments();
    if (userCount > 0) {
      console.log('Data already exists, skipping initialization');
      return; // Data already exists
    }

    try {
      console.log('Creating admin users...');
      // Create admin users
      const adminUser: InsertUser = {
        username: "admin",
        email: "admin@cinemabook.vn",
        password: await bcrypt.hash("password", 10),
        fullName: "Administrator",
        phone: "0123456789",
        role: "admin",
      };

      const adminUser2: InsertUser = {
        username: "admin2",
        email: "admin2@cinemabook.vn",
        password: await bcrypt.hash("password", 10),
        fullName: "Admin User 2",
        phone: "0987654321",
        role: "admin",
      };

      // Tạo thêm người dùng thường
      const regularUsers: InsertUser[] = [
        {
          username: "user1",
          email: "user1@example.com",
          password: await bcrypt.hash("password", 10),
          fullName: "Nguyễn Văn A",
          phone: "0912345678",
          role: "user",
        },
        {
          username: "user2",
          email: "user2@example.com",
          password: await bcrypt.hash("password", 10),
          fullName: "Trần Thị B",
          phone: "0987654321",
          role: "user",
        },
        {
          username: "user3",
          email: "user3@example.com",
          password: await bcrypt.hash("password", 10),
          fullName: "Lê Văn C",
          phone: "0901234567",
          role: "user",
        },
      ];

      const userResults = await this.users.insertMany([adminUser, adminUser2, ...regularUsers]);
      const adminId = userResults.insertedIds[0];
      const admin2Id = userResults.insertedIds[1];
      const user1Id = userResults.insertedIds[2];
      const user2Id = userResults.insertedIds[3];
      const user3Id = userResults.insertedIds[4];
      console.log('Admin users created');

      // Create sample movies - Thêm nhiều phim hơn
      const movies = [
        {
          title: "Fast & Furious X",
          description: "Dom Toretto và gia đình của anh ấy trở thành mục tiêu của con trai báo thù của trùm ma túy Hernan Reyes.",
          genre: ["Hành động", "Phiêu lưu"],
          duration: 142,
          ageRating: "16+",
          posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600",
          trailerUrl: "https://www.youtube.com/watch?v=example",
          actors: ["Vin Diesel", "Michelle Rodriguez", "Tyrese Gibson", "Ludacris"],
          director: "Louis Leterrier",
          releaseDate: new Date("2024-01-15"),
          status: "active",
          createdAt: new Date(),
        },
        {
          title: "Em và Trịnh",
          description: "Câu chuyện tình yêu đẹp đẽ và cuộc đời đầy thăng trầm của nhạc sĩ Trịnh Công Sơn.",
          genre: ["Tâm lý", "Tình cảm", "Âm nhạc"],
          duration: 105,
          ageRating: "13+",
          posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600",
          trailerUrl: "https://www.youtube.com/watch?v=example2",
          actors: ["Avin Lu", "Anh Tú"],
          director: "Phan Gia Nhật Linh",
          releaseDate: new Date("2024-02-20"),
          status: "active",
          createdAt: new Date(),
        },
        {
          title: "Spider-Man: Across the Spider-Verse",
          description: "Phần tiếp theo của bộ phim hoạt hình Spider-Man đoạt giải Oscar",
          genre: ["Hành động", "Hoạt hình", "Khoa học viễn tưởng"],
          duration: 140,
          ageRating: "13+",
          posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
          trailerUrl: "https://www.youtube.com/watch?v=cqGjhVJWtEg",
          actors: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
          director: "Joaquim Dos Santos",
          releaseDate: new Date("2024-05-20"),
          status: "coming-soon",
          createdAt: new Date(),
        },
        {
          title: "Oppenheimer",
          description: "Câu chuyện về J. Robert Oppenheimer, nhà vật lý lý thuyết người đã giúp phát triển bom nguyên tử.",
          genre: ["Tiểu sử", "Lịch sử", "Chính kịch"],
          duration: 180,
          ageRating: "16+",
          posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
          trailerUrl: "https://www.youtube.com/watch?v=example3",
          actors: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
          director: "Christopher Nolan",
          releaseDate: new Date("2024-03-10"),
          status: "active",
          createdAt: new Date(),
        },
        {
          title: "Barbie",
          description: "Barbie và Ken đang có một ngày tuyệt vời ở vùng đất Barbie đầy màu sắc và dường như hoàn hảo.",
          genre: ["Hài", "Phiêu lưu", "Giả tưởng"],
          duration: 114,
          ageRating: "13+",
          posterUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
          trailerUrl: "https://www.youtube.com/watch?v=example4",
          actors: ["Margot Robbie", "Ryan Gosling", "Will Ferrell"],
          director: "Greta Gerwig",
          releaseDate: new Date("2024-03-25"),
          status: "active",
          createdAt: new Date(),
        },
        {
          title: "The Batman",
          description: "Khi kẻ giết người hàng loạt nhắm vào giới tinh hoa của Gotham, Batman phải điều tra tham nhũng sâu xa.",
          genre: ["Hành động", "Tội phạm", "Bí ẩn"],
          duration: 176,
          ageRating: "16+",
          posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
          trailerUrl: "https://www.youtube.com/watch?v=example5",
          actors: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
          director: "Matt Reeves",
          releaseDate: new Date("2024-04-05"),
          status: "active",
          createdAt: new Date(),
        },
        {
          title: "Avatar: The Way of Water",
          description: "Jake Sully sống cùng gia đình mới của mình trên hành tinh Pandora.",
          genre: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
          duration: 192,
          ageRating: "13+",
          posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
          trailerUrl: "https://www.youtube.com/watch?v=example6",
          actors: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
          director: "James Cameron",
          releaseDate: new Date("2024-04-20"),
          status: "active",
          createdAt: new Date(),
        },
        {
          title: "Guardians of the Galaxy Vol. 3",
          description: "Đội Vệ binh Dải Ngân hà tiếp tục cuộc phiêu lưu của họ.",
          genre: ["Hành động", "Hài", "Khoa học viễn tưởng"],
          duration: 150,
          ageRating: "13+",
          posterUrl: "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
          trailerUrl: "https://www.youtube.com/watch?v=example7",
          actors: ["Chris Pratt", "Zoe Saldana", "Dave Bautista"],
          director: "James Gunn",
          releaseDate: new Date("2024-05-15"),
          status: "coming-soon",
          createdAt: new Date(),
        },
      ];

      const movieResults = await this.movies.insertMany(movies);
      const movieIds = Object.values(movieResults.insertedIds);

      // Create sample cinemas
      const cinemas = [
        {
          name: "CGV Vincom Center",
          address: "191 Bà Triệu, Hai Bà Trưng, Hà Nội",
          phone: "1900 6017",
          createdAt: new Date(),
        },
        {
          name: "Lotte Cinema",
          address: "54 Liễu Giai, Ba Đình, Hà Nội",
          phone: "1900 5555",
          createdAt: new Date(),
        },
        {
          name: "Galaxy Cinema",
          address: "116 Nguyễn Du, Hai Bà Trưng, Hà Nội",
          phone: "1900 2224",
          createdAt: new Date(),
        },
        {
          name: "Beta Cinema",
          address: "Tầng 3, TTTM Golden Palace, Mễ Trì, Nam Từ Liêm, Hà Nội",
          phone: "1900 2610",
          createdAt: new Date(),
        }
      ];

      const cinemaResults = await this.cinemas.insertMany(cinemas);
      const cinemaIds = Object.values(cinemaResults.insertedIds);

      // Create sample rooms
      const rooms = [
        {
          cinemaId: cinemaIds[0],
          name: "Phòng 1",
          capacity: 120,
          createdAt: new Date(),
        },
        {
          cinemaId: cinemaIds[0],
          name: "Phòng 2",
          capacity: 100,
          createdAt: new Date(),
        },
        {
          cinemaId: cinemaIds[1],
          name: "Phòng VIP",
          capacity: 80,
          createdAt: new Date(),
        },
        {
          cinemaId: cinemaIds[1],
          name: "Phòng 3D",
          capacity: 150,
          createdAt: new Date(),
        },
        {
          cinemaId: cinemaIds[2],
          name: "Phòng IMAX",
          capacity: 200,
          createdAt: new Date(),
        },
        {
          cinemaId: cinemaIds[3],
          name: "Phòng Premium",
          capacity: 90,
          createdAt: new Date(),
        }
      ];

      const roomResults = await this.rooms.insertMany(rooms);
      const roomIds = Object.values(roomResults.insertedIds);

      // Generate seat layout for showtimes
      const generateSeats = () => {
        const seats = [];
        for (let row = 0; row < 10; row++) {
          for (let seat = 1; seat <= 12; seat++) {
            seats.push(`${String.fromCharCode(65 + row)}${seat}`);
          }
        }
        return seats;
      };

      // Create sample showtimes - Thêm nhiều suất chiếu hơn
      const allSeats = generateSeats();
      const showtimes = [
        // Fast & Furious X
        {
          movieId: movieIds[0],
          roomId: roomIds[0],
          startTime: new Date("2025-01-20T14:00:00Z"),
          endTime: new Date("2025-01-20T16:22:00Z"),
          price: "100000",
          availableSeats: [...allSeats],
          createdAt: new Date(),
        },
        {
          movieId: movieIds[0],
          roomId: roomIds[1],
          startTime: new Date("2025-01-20T18:00:00Z"),
          endTime: new Date("2025-01-20T20:22:00Z"),
          price: "120000",
          availableSeats: [...allSeats],
          createdAt: new Date(),
        },
        {
          movieId: movieIds[0],
          roomId: roomIds[2],
          startTime: new Date("2025-01-20T20:30:00Z"),
          endTime: new Date("2025-01-20T22:52:00Z"),
          price: "150000",
          availableSeats: [...allSeats],
          createdAt: new Date(),
        },
        // Em và Trịnh
        {
          movieId: movieIds[1],
          roomId: roomIds[0],
          startTime: new Date("2025-01-21T15:00:00Z"),
          endTime: new Date("2025-01-21T16:45:00Z"),
          price: "80000",
          availableSeats: [...allSeats],
          createdAt: new Date(),
        },
        {
          movieId: movieIds[1],
          roomId: roomIds[3],
          startTime: new Date("2025-01-21T19:00:00Z"),
          endTime: new Date("2025-01-21T20:45:00Z"),
          price: "90000",
          availableSeats: [...allSeats],
          createdAt: new Date(),
        },
        // Spider-Man
        {
          movieId: movieIds[2],
          roomId: roomIds[4],
          startTime: new Date("2025-05-25T16:00:00Z"),
          endTime: new Date("2025-05-25T18:20:00Z"),
          price: "130000",
          availableSeats: [...allSeats],
          createdAt: new Date(),
        },
        // Oppenheimer
        {
          movieId: movieIds[3],
          roomId: roomIds[2],
          startTime: new Date("2025-01-22T14:00:00Z"),
          endTime: new Date("2025-01-22T17:00:00Z"),
          price: "140000",
          availableSeats: [...allSeats],
          createdAt: new Date(),
        },
        {
          movieId: movieIds[3],
          roomId: roomIds[4],
          startTime: new Date("2025-01-22T18:00:00Z"),
          endTime: new Date("2025-01-22T21:00:00Z"),
          price: "160000",
          availableSeats: [...allSeats],
          createdAt: new Date(),
        },
        // Barbie
        {
          movieId: movieIds[4],
          roomId: roomIds[1],
          startTime: new Date("2025-01-23T15:30:00Z"),
          endTime: new Date("2025-01-23T17:24:00Z"),
          price: "95000",
          availableSeats: [...allSeats],
          createdAt: new Date(),
        },
        {
          movieId: movieIds[4],
          roomId: roomIds[3],
          startTime: new Date("2025-01-23T20:00:00Z"),
          endTime: new Date("2025-01-23T21:54:00Z"),
          price: "110000",
          availableSeats: [...allSeats],
          createdAt: new Date(),
        },
        // The Batman
        {
          movieId: movieIds[5],
          roomId: roomIds[4],
          startTime: new Date("2025-01-24T14:30:00Z"),
          endTime: new Date("2025-01-24T17:26:00Z"),
          price: "135000",
          availableSeats: [...allSeats],
          createdAt: new Date(),
        },
        {
          movieId: movieIds[5],
          roomId: roomIds[2],
          startTime: new Date("2025-01-24T19:00:00Z"),
          endTime: new Date("2025-01-24T21:56:00Z"),
          price: "155000",
          availableSeats: [...allSeats],
          createdAt: new Date(),
        },
        // Avatar
        {
          movieId: movieIds[6],
          roomId: roomIds[4],
          startTime: new Date("2025-01-25T13:00:00Z"),
          endTime: new Date("2025-01-25T16:12:00Z"),
          price: "170000",
          availableSeats: [...allSeats],
          createdAt: new Date(),
        },
        {
          movieId: movieIds[6],
          roomId: roomIds[4],
          startTime: new Date("2025-01-25T17:00:00Z"),
          endTime: new Date("2025-01-25T20:12:00Z"),
          price: "180000",
          availableSeats: [...allSeats],
          createdAt: new Date(),
        },
        {
          movieId: movieIds[6],
          roomId: roomIds[4],
          startTime: new Date("2025-01-25T21:00:00Z"),
          endTime: new Date("2025-01-26T00:12:00Z"),
          price: "190000",
          availableSeats: [...allSeats],
          createdAt: new Date(),
        },
      ];

      const showtimeResults = await this.showtimes.insertMany(showtimes);
      const showtimeIds = Object.values(showtimeResults.insertedIds);

      // Tạo nhiều vé mẫu để test với dữ liệu đa dạng
      const sampleTickets = [
        {
          userId: user1Id,
          showtimeId: showtimeIds[0],
          seats: ["A1", "A2"],
          totalPrice: "200000",
          paymentMethod: "credit_card",
          customerInfo: JSON.stringify({
            name: "Nguyễn Văn A",
            email: "nguyenvana@example.com",
            phone: "0912345678"
          }),
          status: "confirmed",
          bookingCode: `TK${Date.now()}${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
          createdAt: new Date(),
        },
        {
          userId: user2Id,
          showtimeId: showtimeIds[1],
          seats: ["B5", "B6", "B7"],
          totalPrice: "360000",
          paymentMethod: "momo",
          customerInfo: JSON.stringify({
            name: "Trần Thị B",
            email: "tranthib@example.com",
            phone: "0987654321"
          }),
          status: "confirmed",
          bookingCode: `TK${Date.now() + 1}${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
          createdAt: new Date(),
        },
        {
          userId: user3Id,
          showtimeId: showtimeIds[3],
          seats: ["C10"],
          totalPrice: "80000",
          paymentMethod: "cash",
          customerInfo: JSON.stringify({
            name: "Lê Văn C",
            email: "levanc@example.com",
            phone: "0901234567"
          }),
          status: "confirmed",
          bookingCode: `TK${Date.now() + 2}${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
          createdAt: new Date(),
        },
        {
          userId: adminId,
          showtimeId: showtimeIds[6],
          seats: ["D1", "D2", "D3", "D4"],
          totalPrice: "560000",
          paymentMethod: "vnpay",
          customerInfo: JSON.stringify({
            name: "Phạm Minh D",
            email: "phamminhd@example.com",
            phone: "0923456789"
          }),
          status: "confirmed",
          bookingCode: `TK${Date.now() + 3}${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
          createdAt: new Date(),
        },
        {
          userId: user1Id,
          showtimeId: showtimeIds[8],
          seats: ["E5", "E6"],
          totalPrice: "190000",
          paymentMethod: "credit_card",
          customerInfo: JSON.stringify({
            name: "Hoàng Thị E",
            email: "hoangthie@example.com",
            phone: "0934567890"
          }),
          status: "confirmed",
          bookingCode: `TK${Date.now() + 4}${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
          createdAt: new Date(),
        },
        {
          userId: user2Id,
          showtimeId: showtimeIds[10],
          seats: ["F8", "F9", "F10"],
          totalPrice: "405000",
          paymentMethod: "momo",
          customerInfo: JSON.stringify({
            name: "Vũ Văn F",
            email: "vuvanf@example.com",
            phone: "0945678901"
          }),
          status: "confirmed",
          bookingCode: `TK${Date.now() + 5}${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
          createdAt: new Date(),
        },
        {
          userId: user3Id,
          showtimeId: showtimeIds[12],
          seats: ["G1", "G2", "G3", "G4", "G5"],
          totalPrice: "850000",
          paymentMethod: "vnpay",
          customerInfo: JSON.stringify({
            name: "Đặng Thị G",
            email: "dangthig@example.com",
            phone: "0956789012"
          }),
          status: "confirmed",
          bookingCode: `TK${Date.now() + 6}${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
          createdAt: new Date(),
        },
        {
          userId: admin2Id,
          showtimeId: showtimeIds[2],
          seats: ["H6", "H7"],
          totalPrice: "300000",
          paymentMethod: "credit_card",
          customerInfo: JSON.stringify({
            name: "Bùi Văn H",
            email: "buivanh@example.com",
            phone: "0967890123"
          }),
          status: "confirmed",
          bookingCode: `TK${Date.now() + 7}${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
          createdAt: new Date(),
        },
        {
          userId: user1Id,
          showtimeId: showtimeIds[7],
          seats: ["I10", "I11", "I12"],
          totalPrice: "480000",
          paymentMethod: "momo",
          customerInfo: JSON.stringify({
            name: "Lý Thị I",
            email: "lythii@example.com",
            phone: "0978901234"
          }),
          status: "confirmed",
          bookingCode: `TK${Date.now() + 8}${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
          createdAt: new Date(),
        },
        {
          userId: user2Id,
          showtimeId: showtimeIds[11],
          seats: ["J5"],
          totalPrice: "155000",
          paymentMethod: "cash",
          customerInfo: JSON.stringify({
            name: "Trương Văn J",
            email: "truongvanj@example.com",
            phone: "0989012345"
          }),
          status: "confirmed",
          bookingCode: `TK${Date.now() + 9}${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
          createdAt: new Date(),
        },
      ];

      await this.tickets.insertMany(sampleTickets);
      console.log('Sample tickets created');

      // Create sample promotions
      const promotions = [
        {
          title: "Khuyến mãi sinh viên",
          description: "Giảm giá 20% cho sinh viên có thẻ",
          code: "STUDENT20",
          discountType: "percentage",
          discountValue: 20,
          minPurchase: 0,
          maxUses: 100,
          currentUses: 0,
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-12-31"),
          isActive: true,
          createdAt: new Date(),
        },
        {
          title: "Khuyến mãi cuối tuần",
          description: "Giảm 50,000 VND cho đơn hàng cuối tuần",
          code: "WEEKEND50",
          discountType: "fixed",
          discountValue: 50000,
          minPurchase: 200000,
          maxUses: 50,
          currentUses: 0,
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-12-31"),
          isActive: true,
          createdAt: new Date(),
        }
      ];

      await this.promotions.insertMany(promotions);

      console.log('Sample data initialized successfully');
    } catch (error) {
      console.error('Failed to initialize sample data:', error);
    }
  }

  // Helper method to convert MongoDB _id to numeric id
  private transformDocument(doc: any): any {
    if (!doc) return doc;
    
    if (Array.isArray(doc)) {
      return doc.map(item => this.transformDocument(item));
    }
    
    const transformed = { ...doc };
    if (doc._id) {
      // Convert ObjectId to a simple numeric ID using hash
      const id = this.objectIdToNumericId(doc._id);
      transformed.id = id;
      delete transformed._id;
    }
    
    // Transform nested ObjectIds
    Object.keys(transformed).forEach(key => {
      if (key.endsWith('Id') && transformed[key] && typeof transformed[key] === 'object') {
        transformed[key] = this.objectIdToNumericId(transformed[key]);
      }
    });
    
    return transformed;
  }

  // Convert ObjectId to numeric ID
  private objectIdToNumericId(objectId: any): number {
    const str = objectId.toString();
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Convert numeric ID to ObjectId - use a mapping approach
  private async numericIdToObjectId(id: number): Promise<ObjectId> {
    // Find the document with the matching numeric ID
    const collections = [this.users, this.movies, this.cinemas, this.rooms, this.showtimes, this.tickets, this.reviews, this.promotions];
    
    for (const collection of collections) {
      const docs = await collection.find({}).toArray();
      for (const doc of docs) {
        if (this.objectIdToNumericId(doc._id) === id) {
          return doc._id;
        }
      }
    }
    
    throw new Error(`No document found with numeric ID: ${id}`);
  }

  // User methods
  async getUsers(): Promise<User[]> {
    const users = await this.users.find({}).toArray();
    return users.map(user => this.transformDocument(user));
  }

  async getUser(id: number): Promise<User | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const user = await this.users.findOne({ _id: objectId });
      return user ? this.transformDocument(user) : undefined;
    } catch (error) {
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await this.users.findOne({ username });
    return user ? this.transformDocument(user) : undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.users.findOne({ email });
    return user ? this.transformDocument(user) : undefined;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const result = await this.users.insertOne({
      ...userData,
      createdAt: new Date()
    });
    
    const user = await this.users.findOne({ _id: result.insertedId });
    return this.transformDocument(user);
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const result = await this.users.findOneAndUpdate(
        { _id: objectId },
        { $set: updates },
        { returnDocument: 'after' }
      );
      
      return result ? this.transformDocument(result) : undefined;
    } catch (error) {
      return undefined;
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const result = await this.users.deleteOne({ _id: objectId });
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }

  // Movie methods
  async getMovies(): Promise<Movie[]> {
    const movies = await this.movies.find({}).toArray();
    return movies.map(movie => this.transformDocument(movie));
  }

  async getMovie(id: number): Promise<Movie | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const movie = await this.movies.findOne({ _id: objectId });
      return movie ? this.transformDocument(movie) : undefined;
    } catch (error) {
      console.error('Error getting movie:', error);
      return undefined;
    }
  }

  async createMovie(movieData: InsertMovie): Promise<Movie> {
    const result = await this.movies.insertOne({
      ...movieData,
      createdAt: new Date()
    });
    
    const movie = await this.movies.findOne({ _id: result.insertedId });
    return this.transformDocument(movie);
  }

  async updateMovie(id: number, updates: Partial<Movie>): Promise<Movie | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const result = await this.movies.findOneAndUpdate(
        { _id: objectId },
        { $set: updates },
        { returnDocument: 'after' }
      );
      
      return result ? this.transformDocument(result) : undefined;
    } catch (error) {
      console.error('Error updating movie:', error);
      return undefined;
    }
  }

  async deleteMovie(id: number): Promise<boolean> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const result = await this.movies.deleteOne({ _id: objectId });
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }

  // Cinema methods
  async getCinemas(): Promise<Cinema[]> {
    const cinemas = await this.cinemas.find({}).toArray();
    return cinemas.map(cinema => this.transformDocument(cinema));
  }

  async getCinema(id: number): Promise<Cinema | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const cinema = await this.cinemas.findOne({ _id: objectId });
      return cinema ? this.transformDocument(cinema) : undefined;
    } catch (error) {
      return undefined;
    }
  }

  async createCinema(cinemaData: InsertCinema): Promise<Cinema> {
    const result = await this.cinemas.insertOne({
      ...cinemaData,
      createdAt: new Date()
    });
    
    const cinema = await this.cinemas.findOne({ _id: result.insertedId });
    return this.transformDocument(cinema);
  }

  async updateCinema(id: number, updates: Partial<Cinema>): Promise<Cinema | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const result = await this.cinemas.findOneAndUpdate(
        { _id: objectId },
        { $set: updates },
        { returnDocument: 'after' }
      );
      
      return result ? this.transformDocument(result) : undefined;
    } catch (error) {
      return undefined;
    }
  }

  async deleteCinema(id: number): Promise<boolean> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const result = await this.cinemas.deleteOne({ _id: objectId });
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }

  // Room methods
  async getRooms(): Promise<Room[]> {
    const rooms = await this.rooms.find({}).toArray();
    return rooms.map(room => this.transformDocument(room));
  }

  async getRoom(id: number): Promise<Room | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const room = await this.rooms.findOne({ _id: objectId });
      return room ? this.transformDocument(room) : undefined;
    } catch (error) {
      return undefined;
    }
  }

  async getRoomsByCinema(cinemaId: number): Promise<Room[]> {
    try {
      const objectId = await this.numericIdToObjectId(cinemaId);
      const rooms = await this.rooms.find({ cinemaId: objectId }).toArray();
      return rooms.map(room => this.transformDocument(room));
    } catch (error) {
      return [];
    }
  }

  async createRoom(roomData: InsertRoom): Promise<Room> {
    const cinemaObjectId = await this.numericIdToObjectId(roomData.cinemaId);
    const result = await this.rooms.insertOne({
      ...roomData,
      cinemaId: cinemaObjectId,
      createdAt: new Date()
    });
    
    const room = await this.rooms.findOne({ _id: result.insertedId });
    return this.transformDocument(room);
  }

  async updateRoom(id: number, updates: Partial<Room>): Promise<Room | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const updateData = { ...updates };
      if (updateData.cinemaId) {
        updateData.cinemaId = await this.numericIdToObjectId(updateData.cinemaId);
      }
      
      const result = await this.rooms.findOneAndUpdate(
        { _id: objectId },
        { $set: updateData },
        { returnDocument: 'after' }
      );
      
      return result ? this.transformDocument(result) : undefined;
    } catch (error) {
      return undefined;
    }
  }

  async deleteRoom(id: number): Promise<boolean> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const result = await this.rooms.deleteOne({ _id: objectId });
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }

  // Showtime methods
  async getShowtimes(): Promise<Showtime[]> {
    const showtimes = await this.showtimes.find({}).toArray();
    return showtimes.map(showtime => this.transformDocument(showtime));
  }

  async getShowtime(id: number): Promise<Showtime | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const showtime = await this.showtimes.findOne({ _id: objectId });
      return showtime ? this.transformDocument(showtime) : undefined;
    } catch (error) {
      return undefined;
    }
  }

  async getShowtimesByMovie(movieId: number): Promise<Showtime[]> {
    try {
      const objectId = await this.numericIdToObjectId(movieId);
      const showtimes = await this.showtimes.find({ movieId: objectId }).toArray();
      return showtimes.map(showtime => this.transformDocument(showtime));
    } catch (error) {
      return [];
    }
  }

  async createShowtime(showtimeData: InsertShowtime): Promise<Showtime> {
    const movieObjectId = await this.numericIdToObjectId(showtimeData.movieId);
    const roomObjectId = await this.numericIdToObjectId(showtimeData.roomId);
    
    const result = await this.showtimes.insertOne({
      ...showtimeData,
      movieId: movieObjectId,
      roomId: roomObjectId,
      createdAt: new Date()
    });
    
    const showtime = await this.showtimes.findOne({ _id: result.insertedId });
    return this.transformDocument(showtime);
  }

  async updateShowtime(id: number, updates: Partial<Showtime>): Promise<Showtime | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const updateData = { ...updates };
      if (updateData.movieId) {
        updateData.movieId = await this.numericIdToObjectId(updateData.movieId);
      }
      if (updateData.roomId) {
        updateData.roomId = await this.numericIdToObjectId(updateData.roomId);
      }
      
      const result = await this.showtimes.findOneAndUpdate(
        { _id: objectId },
        { $set: updateData },
        { returnDocument: 'after' }
      );
      
      return result ? this.transformDocument(result) : undefined;
    } catch (error) {
      return undefined;
    }
  }

  async deleteShowtime(id: number): Promise<boolean> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const result = await this.showtimes.deleteOne({ _id: objectId });
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }

  // Ticket methods
  async getTickets(): Promise<Ticket[]> {
    const tickets = await this.tickets.find({}).toArray();
    return tickets.map(ticket => this.transformDocument(ticket));
  }

  async getTicket(id: number): Promise<Ticket | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const ticket = await this.tickets.findOne({ _id: objectId });
      return ticket ? this.transformDocument(ticket) : undefined;
    } catch (error) {
      return undefined;
    }
  }

  async getTicketsByUser(userId: number): Promise<Ticket[]> {
    try {
      const objectId = await this.numericIdToObjectId(userId);
      const tickets = await this.tickets.find({ userId: objectId }).toArray();
      return tickets.map(ticket => this.transformDocument(ticket));
    } catch (error) {
      return [];
    }
  }

  async createTicket(ticketData: InsertTicket): Promise<Ticket> {
    // Xử lý userId: nếu đã là ObjectId thì dùng luôn, nếu là number thì chuyển đổi
    let userObjectId;
    if (typeof ticketData.userId === 'number') {
      try {
        userObjectId = await this.numericIdToObjectId(ticketData.userId);
      } catch (error) {
        throw new Error(`Không tìm thấy người dùng với ID: ${ticketData.userId}. Vui lòng đăng xuất và đăng nhập lại.`);
      }
    } else {
      userObjectId = ticketData.userId;
    }
    
    // Xử lý showtimeId tương tự
    let showtimeObjectId;
    if (typeof ticketData.showtimeId === 'number') {
      try {
        showtimeObjectId = await this.numericIdToObjectId(ticketData.showtimeId);
      } catch (error) {
        throw new Error(`Không tìm thấy suất chiếu với ID: ${ticketData.showtimeId}`);
      }
    } else {
      showtimeObjectId = ticketData.showtimeId;
    }
    
    const result = await this.tickets.insertOne({
      ...ticketData,
      userId: userObjectId,
      showtimeId: showtimeObjectId,
      createdAt: new Date()
    });
    
    const ticket = await this.tickets.findOne({ _id: result.insertedId });
    return this.transformDocument(ticket);
  }

  async updateTicket(id: number, updates: Partial<Ticket>): Promise<Ticket | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const updateData = { ...updates };
      if (updateData.userId) {
        updateData.userId = await this.numericIdToObjectId(updateData.userId);
      }
      if (updateData.showtimeId) {
        updateData.showtimeId = await this.numericIdToObjectId(updateData.showtimeId);
      }
      
      const result = await this.tickets.findOneAndUpdate(
        { _id: objectId },
        { $set: updateData },
        { returnDocument: 'after' }
      );
      
      return result ? this.transformDocument(result) : undefined;
    } catch (error) {
      return undefined;
    }
  }

  async deleteTicket(id: number): Promise<boolean> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const result = await this.tickets.deleteOne({ _id: objectId });
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }

  // Review methods
  async getReviews(): Promise<Review[]> {
    const reviews = await this.reviews.find({}).toArray();
    return reviews.map(review => this.transformDocument(review));
  }

  async getReview(id: number): Promise<Review | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const review = await this.reviews.findOne({ _id: objectId });
      return review ? this.transformDocument(review) : undefined;
    } catch (error) {
      return undefined;
    }
  }

  async getReviewsByMovie(movieId: number): Promise<Review[]> {
    try {
      const objectId = await this.numericIdToObjectId(movieId);
      const reviews = await this.reviews.find({ movieId: objectId }).toArray();
      return reviews.map(review => this.transformDocument(review));
    } catch (error) {
      return [];
    }
  }

  async createReview(reviewData: InsertReview): Promise<Review> {
    const userObjectId = await this.numericIdToObjectId(reviewData.userId);
    const movieObjectId = await this.numericIdToObjectId(reviewData.movieId);
    
    const result = await this.reviews.insertOne({
      ...reviewData,
      userId: userObjectId,
      movieId: movieObjectId,
      createdAt: new Date()
    });
    
    const review = await this.reviews.findOne({ _id: result.insertedId });
    return this.transformDocument(review);
  }

  async updateReview(id: number, updates: Partial<Review>): Promise<Review | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const updateData = { ...updates };
      if (updateData.userId) {
        updateData.userId = await this.numericIdToObjectId(updateData.userId);
      }
      if (updateData.movieId) {
        updateData.movieId = await this.numericIdToObjectId(updateData.movieId);
      }
      
      const result = await this.reviews.findOneAndUpdate(
        { _id: objectId },
        { $set: updateData },
        { returnDocument: 'after' }
      );
      
      return result ? this.transformDocument(result) : undefined;
    } catch (error) {
      return undefined;
    }
  }

  async deleteReview(id: number): Promise<boolean> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const result = await this.reviews.deleteOne({ _id: objectId });
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }

  // Promotion methods
  async getPromotions(): Promise<Promotion[]> {
    const promotions = await this.promotions.find({}).toArray();
    return promotions.map(promotion => this.transformDocument(promotion));
  }

  async getPromotion(id: number): Promise<Promotion | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const promotion = await this.promotions.findOne({ _id: objectId });
      return promotion ? this.transformDocument(promotion) : undefined;
    } catch (error) {
      return undefined;
    }
  }

  async getPromotionByCode(code: string): Promise<Promotion | undefined> {
    const promotion = await this.promotions.findOne({ code });
    return promotion ? this.transformDocument(promotion) : undefined;
  }

  async getActivePromotions(): Promise<Promotion[]> {
    const now = new Date();
    const promotions = await this.promotions.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now }
    }).toArray();
    return promotions.map(promotion => this.transformDocument(promotion));
  }

  async createPromotion(promotionData: InsertPromotion): Promise<Promotion> {
    const result = await this.promotions.insertOne({
      ...promotionData,
      createdAt: new Date()
    });
    
    const promotion = await this.promotions.findOne({ _id: result.insertedId });
    return this.transformDocument(promotion);
  }

  async updatePromotion(id: number, updates: Partial<Promotion>): Promise<Promotion | undefined> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const result = await this.promotions.findOneAndUpdate(
        { _id: objectId },
        { $set: updates },
        { returnDocument: 'after' }
      );
      
      return result ? this.transformDocument(result) : undefined;
    } catch (error) {
      return undefined;
    }
  }

  async deletePromotion(id: number): Promise<boolean> {
    try {
      const objectId = await this.numericIdToObjectId(id);
      const result = await this.promotions.deleteOne({ _id: objectId });
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }
}