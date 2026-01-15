# API Testing Guide - MiniCinema

Hướng dẫn test API bằng Postman hoặc các công cụ tương tự.

**Base URL**: `http://localhost:5000` (development) hoặc `http://localhost` (Docker)

---

## 1. Authentication APIs

### 1.1 Đăng ký tài khoản
```
POST /api/auth/register
Content-Type: application/json

Body:
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "fullName": "Test User",
  "phone": "0123456789",
  "role": "user"
}

Response (201):
{
  "message": "Đăng ký thành công",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "fullName": "Test User",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 1.2 Đăng nhập
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "test@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Đăng nhập thành công",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "fullName": "Test User",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 1.3 Đăng xuất
```
POST /api/auth/logout
Authorization: Bearer {token}

Response (200):
{
  "message": "Đăng xuất thành công"
}
```

### 1.4 Lấy thông tin user hiện tại
```
GET /api/auth/me
Authorization: Bearer {token}

Response (200):
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "fullName": "Test User",
  "phone": "0123456789",
  "role": "user",
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

---

## 2. Movie APIs

### 2.1 Lấy danh sách phim
```
GET /api/movies
Query params (optional):
  - status: "active" | "inactive"
  - genre: "Hành động" | "Kinh dị" | etc.
  - limit: 10
  - offset: 0

Response (200):
[
  {
    "id": 1,
    "title": "Fast & Furious X",
    "description": "Mô tả phim...",
    "genre": ["Hành động", "Phiêu lưu"],
    "duration": 142,
    "ageRating": "16+",
    "posterUrl": "https://example.com/poster.jpg",
    "trailerUrl": "https://youtube.com/watch?v=...",
    "actors": ["Vin Diesel", "Michelle Rodriguez"],
    "director": "Louis Leterrier",
    "releaseDate": "2024-01-15T00:00:00.000Z",
    "status": "active",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 2.2 Lấy chi tiết phim
```
GET /api/movies/:id

Response (200):
{
  "id": 1,
  "title": "Fast & Furious X",
  "description": "Mô tả phim...",
  "genre": ["Hành động", "Phiêu lưu"],
  "duration": 142,
  "ageRating": "16+",
  "posterUrl": "https://example.com/poster.jpg",
  "trailerUrl": "https://youtube.com/watch?v=...",
  "actors": ["Vin Diesel", "Michelle Rodriguez"],
  "director": "Louis Leterrier",
  "releaseDate": "2024-01-15T00:00:00.000Z",
  "status": "active",
  "showtimes": [...],
  "reviews": [...]
}
```

### 2.3 Tạo phim mới (Admin only)
```
POST /api/movies
Authorization: Bearer {admin_token}
Content-Type: application/json

Body:
{
  "title": "New Movie",
  "description": "Movie description",
  "genre": ["Hành động", "Phiêu lưu"],
  "duration": 120,
  "ageRating": "13+",
  "posterUrl": "https://example.com/poster.jpg",
  "trailerUrl": "https://youtube.com/watch?v=...",
  "actors": ["Actor 1", "Actor 2"],
  "director": "Director Name",
  "releaseDate": "2024-02-01T00:00:00.000Z",
  "status": "active"
}

Response (201):
{
  "message": "Tạo phim thành công",
  "movie": { ... }
}
```

### 2.4 Cập nhật phim (Admin only)
```
PUT /api/movies/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

Body:
{
  "title": "Updated Movie Title",
  "status": "inactive"
}

Response (200):
{
  "message": "Cập nhật phim thành công",
  "movie": { ... }
}
```

### 2.5 Xóa phim (Admin only)
```
DELETE /api/movies/:id
Authorization: Bearer {admin_token}

Response (200):
{
  "message": "Xóa phim thành công"
}
```

---

## 3. Review APIs

### 3.1 Lấy đánh giá của phim
```
GET /api/movies/:movieId/reviews

Response (200):
[
  {
    "id": 1,
    "userId": 1,
    "movieId": 1,
    "rating": 5,
    "content": "Phim rất hay!",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "user": {
      "fullName": "Test User",
      "username": "testuser"
    }
  }
]
```

### 3.2 Tạo đánh giá mới
```
POST /api/movies/:movieId/reviews
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "rating": 5,
  "content": "Phim rất hay, diễn viên xuất sắc!",
  "movieId": 1,
  "userId": 1
}

Response (201):
{
  "message": "Tạo đánh giá thành công",
  "review": {
    "id": 1,
    "userId": 1,
    "movieId": 1,
    "rating": 5,
    "content": "Phim rất hay, diễn viên xuất sắc!",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
}
```

### 3.3 Cập nhật đánh giá
```
PUT /api/reviews/:id
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "rating": 4,
  "content": "Phim hay nhưng hơi dài"
}

Response (200):
{
  "message": "Cập nhật đánh giá thành công",
  "review": { ... }
}
```

### 3.4 Xóa đánh giá
```
DELETE /api/reviews/:id
Authorization: Bearer {token}

Response (200):
{
  "message": "Xóa đánh giá thành công"
}
```

---

## 4. Cinema APIs

### 4.1 Lấy danh sách rạp
```
GET /api/cinemas

Response (200):
[
  {
    "id": 1,
    "name": "Beta Cinema",
    "address": "Tầng 3, TTTM Vincom",
    "phone": "0123456789",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 4.2 Lấy chi tiết rạp
```
GET /api/cinemas/:id

Response (200):
{
  "id": 1,
  "name": "Beta Cinema",
  "address": "Tầng 3, TTTM Vincom",
  "phone": "0123456789",
  "rooms": [...],
  "showtimes": [...]
}
```

### 4.3 Tạo rạp mới (Admin only)
```
POST /api/cinemas
Authorization: Bearer {admin_token}
Content-Type: application/json

Body:
{
  "name": "CGV Cinema",
  "address": "Tầng 5, AEON Mall",
  "phone": "0987654321"
}

Response (201):
{
  "message": "Tạo rạp thành công",
  "cinema": { ... }
}
```

---

## 5. Room APIs

### 5.1 Lấy danh sách phòng chiếu
```
GET /api/rooms
Query params (optional):
  - cinemaId: 1

Response (200):
[
  {
    "id": 1,
    "cinemaId": 1,
    "name": "Phòng 1",
    "capacity": 100,
    "type": "2D",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 5.2 Tạo phòng chiếu mới (Admin only)
```
POST /api/rooms
Authorization: Bearer {admin_token}
Content-Type: application/json

Body:
{
  "cinemaId": 1,
  "name": "Phòng VIP",
  "capacity": 50,
  "type": "IMAX"
}

Response (201):
{
  "message": "Tạo phòng chiếu thành công",
  "room": { ... }
}
```

---

## 6. Showtime APIs

### 6.1 Lấy danh sách suất chiếu
```
GET /api/showtimes
Query params (optional):
  - movieId: 1
  - cinemaId: 1
  - date: "2024-01-15"

Response (200):
[
  {
    "id": 1,
    "movieId": 1,
    "roomId": 1,
    "cinemaId": 1,
    "startTime": "2024-01-15T14:00:00.000Z",
    "endTime": "2024-01-15T16:30:00.000Z",
    "price": "100000",
    "availableSeats": ["A1", "A2", "B1", "B2"],
    "movie": { ... },
    "room": { ... },
    "cinema": { ... }
  }
]
```

### 6.2 Lấy chi tiết suất chiếu
```
GET /api/showtimes/:id

Response (200):
{
  "id": 1,
  "movieId": 1,
  "roomId": 1,
  "cinemaId": 1,
  "startTime": "2024-01-15T14:00:00.000Z",
  "endTime": "2024-01-15T16:30:00.000Z",
  "price": "100000",
  "availableSeats": ["A1", "A2", "B1", "B2"],
  "bookedSeats": ["C1", "C2"],
  "movie": { ... },
  "room": { ... },
  "cinema": { ... }
}
```

### 6.3 Tạo suất chiếu mới (Admin only)
```
POST /api/showtimes
Authorization: Bearer {admin_token}
Content-Type: application/json

Body:
{
  "movieId": 1,
  "roomId": 1,
  "cinemaId": 1,
  "startTime": "2024-01-15T14:00:00.000Z",
  "price": "100000"
}

Response (201):
{
  "message": "Tạo suất chiếu thành công",
  "showtime": { ... }
}
```

---

## 7. Booking/Ticket APIs

### 7.1 Đặt vé
```
POST /api/bookings
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "showtimeId": 1,
  "seats": ["A1", "A2", "A3"],
  "totalPrice": "300000",
  "paymentMethod": "cash",
  "customerInfo": {
    "name": "Nguyễn Văn A",
    "phone": "0123456789",
    "email": "test@example.com"
  }
}

Response (201):
{
  "message": "Đặt vé thành công",
  "tickets": [
    {
      "id": 1,
      "userId": 1,
      "showtimeId": 1,
      "seatNumber": "A1",
      "price": "100000",
      "status": "booked",
      "bookingCode": "BK123456",
      "createdAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

### 7.2 Lấy danh sách vé của user
```
GET /api/tickets
Authorization: Bearer {token}

Response (200):
[
  {
    "id": 1,
    "userId": 1,
    "showtimeId": 1,
    "seatNumber": "A1",
    "price": "100000",
    "status": "booked",
    "bookingCode": "BK123456",
    "showtime": {
      "startTime": "2024-01-15T14:00:00.000Z",
      "movie": { ... },
      "cinema": { ... }
    }
  }
]
```

### 7.3 Lấy chi tiết vé
```
GET /api/tickets/:id
Authorization: Bearer {token}

Response (200):
{
  "id": 1,
  "userId": 1,
  "showtimeId": 1,
  "seatNumber": "A1",
  "price": "100000",
  "status": "booked",
  "bookingCode": "BK123456",
  "customerName": "Nguyễn Văn A",
  "customerPhone": "0123456789",
  "customerEmail": "test@example.com",
  "paymentMethod": "cash",
  "showtime": { ... }
}
```

### 7.4 Hủy vé
```
DELETE /api/tickets/:id
Authorization: Bearer {token}

Response (200):
{
  "message": "Hủy vé thành công"
}
```

---

## 8. Promotion APIs

### 8.1 Lấy danh sách khuyến mãi
```
GET /api/promotions
Query params (optional):
  - status: "active" | "inactive"

Response (200):
[
  {
    "id": 1,
    "code": "NEWYEAR2024",
    "description": "Giảm 20% cho năm mới",
    "discountType": "percentage",
    "discountValue": 20,
    "minPurchase": 100000,
    "maxDiscount": 50000,
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-01-31T23:59:59.000Z",
    "usageLimit": 100,
    "usedCount": 10,
    "status": "active"
  }
]
```

### 8.2 Kiểm tra mã khuyến mãi
```
POST /api/promotions/validate
Content-Type: application/json

Body:
{
  "code": "NEWYEAR2024",
  "totalPrice": 200000
}

Response (200):
{
  "valid": true,
  "code": "NEWYEAR2024",
  "discount": 40000,
  "message": "Mã khuyến mãi hợp lệ"
}
```

### 8.3 Tạo mã khuyến mãi (Admin only)
```
POST /api/promotions
Authorization: Bearer {admin_token}
Content-Type: application/json

Body:
{
  "code": "SUMMER2024",
  "description": "Giảm giá mùa hè",
  "discountType": "percentage",
  "discountValue": 15,
  "minPurchase": 50000,
  "maxDiscount": 30000,
  "startDate": "2024-06-01T00:00:00.000Z",
  "endDate": "2024-08-31T23:59:59.000Z",
  "usageLimit": 200,
  "status": "active"
}

Response (201):
{
  "message": "Tạo khuyến mãi thành công",
  "promotion": { ... }
}
```

---

## 9. Admin APIs

### 9.1 Lấy tất cả vé (Admin only)
```
GET /api/admin/all-tickets
Authorization: Bearer {admin_token}
Query params (optional):
  - status: "booked" | "cancelled"
  - date: "2024-01-15"

Response (200):
[
  {
    "id": 1,
    "userId": 1,
    "showtimeId": 1,
    "seatNumber": "A1",
    "price": "100000",
    "status": "booked",
    "user": { ... },
    "showtime": { ... }
  }
]
```

### 9.2 Lấy danh sách users (Admin only)
```
GET /api/admin/users
Authorization: Bearer {admin_token}

Response (200):
[
  {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "fullName": "Test User",
    "phone": "0123456789",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 9.3 Cập nhật user (Admin only)
```
PUT /api/admin/users/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

Body:
{
  "role": "staff",
  "fullName": "Updated Name"
}

Response (200):
{
  "message": "Cập nhật user thành công",
  "user": { ... }
}
```

### 9.4 Xóa user (Admin only)
```
DELETE /api/admin/users/:id
Authorization: Bearer {admin_token}

Response (200):
{
  "message": "Xóa user thành công"
}
```

---

## 10. Health Check

### 10.1 Kiểm tra trạng thái API
```
GET /api/health

Response (200):
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:00:00.000Z",
  "service": "MiniCinema API",
  "version": "1.0.0"
}
```

---

## Postman Collection Setup

### Cách import vào Postman:

1. Mở Postman
2. Click **Import** > **Raw text**
3. Copy nội dung từ file này
4. Tạo Environment với các biến:
   - `base_url`: `http://localhost:5000` hoặc `http://localhost`
   - `token`: Token nhận được sau khi login
   - `admin_token`: Token của admin

### Environment Variables:
```json
{
  "base_url": "http://localhost:5000",
  "token": "",
  "admin_token": ""
}
```

### Cách sử dụng:
1. Đăng ký/Đăng nhập để lấy token
2. Copy token vào biến `token` trong Environment
3. Sử dụng `{{base_url}}` và `{{token}}` trong các request

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Dữ liệu không hợp lệ",
  "error": "Chi tiết lỗi..."
}
```

### 401 Unauthorized
```json
{
  "message": "Chưa đăng nhập hoặc token không hợp lệ"
}
```

### 403 Forbidden
```json
{
  "message": "Không có quyền truy cập"
}
```

### 404 Not Found
```json
{
  "message": "Không tìm thấy tài nguyên"
}
```

### 500 Internal Server Error
```json
{
  "message": "Lỗi server",
  "error": "Chi tiết lỗi..."
}
```

---

## Notes

- Tất cả các API yêu cầu authentication cần có header: `Authorization: Bearer {token}`
- Token có thời hạn 7 ngày
- Admin account mặc định:
  - Email: `admin@cinemabook.vn`
  - Password: `password`
- Tất cả datetime sử dụng ISO 8601 format
- Giá tiền được lưu dưới dạng string để tránh lỗi làm tròn
