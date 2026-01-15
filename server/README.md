# 🗂️ Server Structure - MiniCinema Backend

## 📋 Cấu trúc thư mục mới (MVC Pattern)

```
server/
├── config/                 # Cấu hình
│   └── jwt.ts             # JWT configuration
│
├── middleware/            # Middleware
│   └── auth.middleware.ts # Authentication & Authorization
│
├── controllers/           # Business Logic (xử lý request/response)
│   ├── auth.controller.ts      # Đăng ký, đăng nhập
│   ├── movie.controller.ts     # Quản lý phim
│   ├── cinema.controller.ts    # Quản lý rạp
│   ├── showtime.controller.ts  # Quản lý suất chiếu
│   ├── ticket.controller.ts    # Quản lý vé
│   ├── user.controller.ts      # Quản lý người dùng
│   ├── promotion.controller.ts # Quản lý khuyến mãi
│   ├── review.controller.ts    # Quản lý đánh giá
│   └── room.controller.ts      # Quản lý phòng chiếu
│
├── routes/                # API Routes
│   ├── index.ts           # Tổng hợp tất cả routes
│   ├── auth.routes.ts     # /api/auth/*
│   ├── movie.routes.ts    # /api/movies/*
│   ├── cinema.routes.ts   # /api/cinemas/*
│   ├── showtime.routes.ts # /api/showtimes/*
│   ├── ticket.routes.ts   # /api/tickets/*
│   ├── booking.routes.ts  # /api/bookings/*
│   ├── admin.routes.ts    # /api/admin/*
│   ├── promotion.routes.ts# /api/promotions/*
│   ├── review.routes.ts   # /api/reviews/*
│   └── room.routes.ts     # /api/rooms/*
│
├── index.ts               # Entry point
├── mongodb.ts             # Database connection
├── storage.ts             # Data access layer
├── swagger.ts             # Swagger setup
├── swagger-docs.ts        # Swagger documentation
└── vite.ts                # Vite integration
```

## 🎯 Ưu điểm của cấu trúc mới

### 1. **Separation of Concerns**
- **Controllers**: Xử lý logic nghiệp vụ
- **Routes**: Định nghĩa endpoints
- **Middleware**: Xác thực, phân quyền
- **Config**: Cấu hình tập trung

### 2. **Dễ bảo trì**
- Mỗi file có trách nhiệm rõ ràng
- Dễ tìm và sửa lỗi
- Code ngắn gọn, dễ đọc

### 3. **Dễ mở rộng**
- Thêm feature mới chỉ cần tạo controller + route
- Không ảnh hưởng code cũ
- Dễ test từng phần

### 4. **Follow Best Practices**
- MVC Pattern
- RESTful API
- Clean Code
- SOLID Principles

## 📝 Cách sử dụng

### Thêm feature mới

**Ví dụ: Thêm feature "Payment"**

1. **Tạo Controller** (`controllers/payment.controller.ts`):
```typescript
import { Request, Response } from "express";

export class PaymentController {
  static async processPayment(req: Request, res: Response) {
    // Logic xử lý thanh toán
  }
}
```

2. **Tạo Routes** (`routes/payment.routes.ts`):
```typescript
import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();
router.post('/process', authenticateToken, PaymentController.processPayment);

export default router;
```

3. **Đăng ký Routes** (trong `routes/index.ts`):
```typescript
import paymentRoutes from "./payment.routes";

app.use('/api/payments', paymentRoutes);
```

### Sửa feature hiện có

**Ví dụ: Sửa logic đăng nhập**

1. Mở file `controllers/auth.controller.ts`
2. Tìm method `login`
3. Sửa logic
4. Save - Done!

## 🔍 So sánh với cấu trúc cũ

### ❌ Cũ (1 file routes.ts - 800+ dòng)
```
server/
├── routes.ts  (800+ lines) ❌ Khó đọc, khó maintain
├── index.ts
└── ...
```

### ✅ Mới (Tách thành nhiều file nhỏ)
```
server/
├── controllers/  (8 files, mỗi file ~50-150 lines) ✅
├── routes/       (10 files, mỗi file ~10-20 lines) ✅
├── middleware/   (1 file, ~50 lines) ✅
└── config/       (1 file, ~5 lines) ✅
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập

### Movies
- `GET /api/movies` - Lấy danh sách phim
- `GET /api/movies/:id` - Lấy chi tiết phim
- `POST /api/movies` - Tạo phim mới (Admin)
- `PUT /api/movies/:id` - Cập nhật phim (Admin)
- `DELETE /api/movies/:id` - Xóa phim (Admin)
- `GET /api/movies/:id/reviews` - Lấy đánh giá phim

### Cinemas
- `GET /api/cinemas` - Lấy danh sách rạp
- `GET /api/cinemas/:cinemaId/rooms` - Lấy phòng chiếu
- `POST /api/cinemas` - Tạo rạp mới (Admin)
- `PUT /api/cinemas/:id` - Cập nhật rạp (Admin)
- `DELETE /api/cinemas/:id` - Xóa rạp (Admin)

### Showtimes
- `GET /api/showtimes` - Lấy danh sách suất chiếu
- `GET /api/movies/:movieId/showtimes` - Lấy suất chiếu theo phim
- `POST /api/showtimes` - Tạo suất chiếu (Admin)
- `PUT /api/showtimes/:id` - Cập nhật suất chiếu (Admin)
- `DELETE /api/showtimes/:id` - Xóa suất chiếu (Admin)

### Tickets & Bookings
- `GET /api/tickets` - Lấy vé của user (Auth)
- `POST /api/bookings` - Đặt vé (Auth)
- `POST /api/tickets` - Tạo vé (Auth)
- `PUT /api/tickets/:id` - Cập nhật vé (Auth)

### Admin
- `GET /api/admin/users` - Quản lý users (Admin)
- `PUT /api/admin/users/:id` - Cập nhật user (Admin)
- `DELETE /api/admin/users/:id` - Xóa user (Admin)
- `GET /api/admin/tickets` - Xem tất cả vé (Staff)
- `GET /api/admin/all-tickets` - Xem tất cả vé (Admin)

### Promotions
- `GET /api/promotions` - Lấy khuyến mãi
- `GET /api/promotions/active` - Lấy khuyến mãi đang hoạt động
- `POST /api/promotions/validate` - Validate mã khuyến mãi

### Reviews
- `POST /api/reviews` - Tạo đánh giá (Auth)

### Rooms
- `GET /api/rooms` - Lấy danh sách phòng

## 🔐 Middleware

### authenticateToken
Kiểm tra JWT token, gắn user vào request

### requireAdmin
Yêu cầu role = 'admin'

### requireStaff
Yêu cầu role = 'staff' hoặc 'admin'

## 🚀 Development

```bash
# Start dev server
npm run dev

# Type check
npm run check

# Build
npm run build
```

## 📖 Tài liệu API

Swagger UI: http://localhost:5000/api-docs

---

**Lưu ý**: Cấu trúc này giúp code dễ đọc, dễ maintain và dễ mở rộng hơn rất nhiều so với cấu trúc cũ!
