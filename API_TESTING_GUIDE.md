# Hướng dẫn kiểm thử API với Postman

## 📋 Tổng quan

Tài liệu này hướng dẫn cách sử dụng Postman để kiểm thử API của hệ thống đặt vé xem phim. Bao gồm:

- ✅ Collection Postman hoàn chỉnh với tất cả endpoints
- ✅ Environment variables để quản lý cấu hình
- ✅ Test scripts tự động validate responses
- ✅ Newman CLI để chạy tests từ command line
- ✅ Test runner script để automation

## 📁 Cấu trúc files

```
postman/
├── Movie_Ticket_Booking_API.postman_collection.json  # Collection chính
├── Development.postman_environment.json              # Environment variables
├── test-runner.js                                    # Script chạy tests tự động
├── package.json                                      # Dependencies cho testing
└── README.md                                         # Hướng dẫn chi tiết
```

## 🚀 Cài đặt và sử dụng

### Bước 1: Chuẩn bị môi trường

1. **Khởi động server:**
   ```bash
   npm run dev
   ```
   Server sẽ chạy trên `http://localhost:5000`

2. **Cài đặt Newman (tùy chọn):**
   ```bash
   npm install -g newman
   ```

### Bước 2: Import vào Postman

1. **Mở Postman Desktop App**
2. **Import Collection:**
   - Click "Import" → Chọn `Movie_Ticket_Booking_API.postman_collection.json`
3. **Import Environment:**
   - Click "Import" → Chọn `Development.postman_environment.json`
4. **Chọn Environment:**
   - Dropdown góc phải trên → Chọn "Development Environment"

### Bước 3: Chạy tests

#### Trong Postman GUI:
1. **Test từng endpoint riêng lẻ**
2. **Chạy toàn bộ collection:** Click "Run" trên collection
3. **Chạy theo folder:** Click "Run" trên từng folder

#### Từ Command Line (Newman):
```bash
# Chạy toàn bộ collection
newman run postman/Movie_Ticket_Booking_API.postman_collection.json \
  --environment postman/Development.postman_environment.json

# Chạy script tự động
cd postman
node test-runner.js

# Hoặc sử dụng npm scripts
npm test
npm run test:auth      # Chỉ test Authentication
npm run test:movies    # Chỉ test Movies
npm run test:bookings  # Chỉ test Bookings
```

## 📊 Các API Endpoints được test

### 🔐 Authentication
- `POST /api/auth/register` - Đăng ký user mới
- `POST /api/auth/login` - Đăng nhập user/admin

### 🎬 Movies
- `GET /api/movies` - Lấy danh sách phim
- `GET /api/movies/:id` - Lấy chi tiết phim
- `POST /api/movies` - Tạo phim mới (Admin)
- `PUT /api/movies/:id` - Cập nhật phim (Admin)
- `DELETE /api/movies/:id` - Xóa phim (Admin)

### 🏢 Cinemas
- `GET /api/cinemas` - Lấy danh sách rạp
- `POST /api/cinemas` - Tạo rạp mới (Admin)
- `PUT /api/cinemas/:id` - Cập nhật rạp (Admin)

### 🏠 Rooms
- `GET /api/rooms` - Lấy danh sách phòng
- `GET /api/cinemas/:id/rooms` - Lấy phòng theo rạp
- `POST /api/rooms` - Tạo phòng mới (Admin)

### ⏰ Showtimes
- `GET /api/showtimes` - Lấy danh sách suất chiếu
- `GET /api/movies/:id/showtimes` - Lấy suất chiếu theo phim
- `POST /api/showtimes` - Tạo suất chiếu (Admin)

### 🎫 Tickets & Bookings
- `GET /api/tickets` - Lấy vé của user hiện tại
- `POST /api/bookings` - Đặt vé mới
- `GET /api/bookings/:code` - Lấy thông tin đặt vé

### ⭐ Reviews
- `GET /api/movies/:id/reviews` - Lấy đánh giá của phim
- `POST /api/reviews` - Tạo đánh giá mới

## 🧪 Test Cases được kiểm tra

### ✅ Functional Tests
- **Authentication:** Đăng ký, đăng nhập thành công/thất bại
- **Authorization:** Kiểm tra quyền admin/user
- **CRUD Operations:** Tạo, đọc, cập nhật, xóa dữ liệu
- **Business Logic:** Đặt vé, kiểm tra ghế trống, tính giá
- **Data Validation:** Validate input data, required fields

### ✅ Technical Tests
- **HTTP Status Codes:** 200, 201, 400, 401, 403, 404, 500
- **Response Format:** JSON structure validation
- **Headers:** Content-Type, Authorization
- **Error Handling:** Error messages và error codes

### ✅ Integration Tests
- **Data Dependencies:** Movie → Showtime → Booking flow
- **Token Management:** JWT token lifecycle
- **Database Operations:** Data persistence và consistency

## 📈 Kết quả mong đợi

### ✅ Successful Test Run
```
📊 KẾT QUẢ TỔNG QUAN:
==================================================
📁 Collection: Movie Ticket Booking API
⏱️  Thời gian chạy: 15000ms
📈 Tổng số requests: 25
✅ Requests thành công: 25
❌ Requests thất bại: 0
🧪 Tổng số tests: 50
✅ Tests passed: 50
❌ Tests failed: 0
```

## 🔧 Troubleshooting

### ❌ Server Connection Issues
```bash
# Kiểm tra server có chạy không
curl http://localhost:5000/api/movies

# Hoặc
npm run check-server
```

### ❌ Authentication Failures
- Kiểm tra credentials trong environment
- Đảm bảo token chưa hết hạn
- Chạy lại login để lấy token mới

### ❌ Test Failures
- Kiểm tra data dependencies (tạo movie trước khi tạo showtime)
- Kiểm tra database có dữ liệu cần thiết không
- Xem chi tiết lỗi trong test results

## 📝 Tài khoản test mặc định

### Admin Account
- **Email:** admin@nacinema.com
- **Password:** admin123
- **Quyền:** Toàn quyền quản trị

### Test User Account  
- **Email:** test@example.com
- **Password:** password123
- **Quyền:** User thường

## 🎯 Best Practices

1. **Chạy tests theo thứ tự:** Authentication → Movies → Cinemas → Rooms → Showtimes → Bookings
2. **Kiểm tra dependencies:** Đảm bảo có dữ liệu cần thiết trước khi test
3. **Clean up:** Xóa test data sau khi test xong (nếu cần)
4. **Monitor results:** Theo dõi test results và fix issues ngay lập tức
5. **Automate:** Sử dụng Newman để tích hợp vào CI/CD pipeline

## 📞 Hỗ trợ

Nếu gặp vấn đề khi testing:
1. Kiểm tra server logs
2. Xem chi tiết error trong Postman Console
3. Kiểm tra database connection
4. Verify API documentation

---

**Happy Testing! 🚀**
