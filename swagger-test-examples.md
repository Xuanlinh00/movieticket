# 🧪 Swagger API Testing Examples

## 🎯 Hướng dẫn test API với Swagger UI

### 1. Truy cập Swagger UI
```
http://localhost:5000/api-docs
```

### 2. Test Authentication Flow

#### Đăng ký user mới:
```json
POST /api/auth/register
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "fullName": "Test User",
  "phone": "0123456789",
  "role": "user"
}
```

#### Đăng nhập:
```json
POST /api/auth/login
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response sẽ chứa JWT token:**
```json
{
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

### 3. Authorize trong Swagger

1. **Copy JWT token** từ login response
2. **Click "Authorize" button** ở đầu Swagger UI
3. **Nhập token** với format: `Bearer your-token-here`
4. **Click "Authorize"**

### 4. Test Protected Endpoints

#### Lấy danh sách tickets của user:
```
GET /api/tickets
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Tạo booking mới:
```json
POST /api/bookings
Authorization: Bearer your-token-here
{
  "showtimeId": 1,
  "seats": ["A1", "A2"],
  "totalPrice": "200000",
  "paymentMethod": "card",
  "customerInfo": {
    "name": "Test User",
    "phone": "0123456789",
    "email": "test@example.com"
  }
}
```

### 5. Test Public Endpoints

#### Lấy danh sách phim:
```
GET /api/movies
```

#### Lấy thông tin phim cụ thể:
```
GET /api/movies/1
```

#### Lấy danh sách rạp:
```
GET /api/cinemas
```

### 6. Test Admin Endpoints

#### Đăng nhập với admin account:
```json
POST /api/auth/login
{
  "email": "admin@cinemabook.vn",
  "password": "password"
}
```

#### Lấy danh sách users (Admin only):
```
GET /api/admin/users
Authorization: Bearer admin-token-here
```

#### Tạo phim mới (Admin only):
```json
POST /api/admin/movies
Authorization: Bearer admin-token-here
{
  "title": "New Movie",
  "description": "Movie description",
  "genre": "Action",
  "duration": 120,
  "ageRating": "PG-13",
  "posterUrl": "https://example.com/poster.jpg",
  "trailerUrl": "https://example.com/trailer.mp4",
  "status": "active"
}
```

---

## 🔧 Testing Tips

### 1. Response Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **401**: Unauthorized (missing/invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **500**: Internal Server Error

### 2. Common Test Scenarios

#### Authentication Tests:
- ✅ Register with valid data
- ❌ Register with duplicate email
- ✅ Login with correct credentials
- ❌ Login with wrong password
- ❌ Access protected route without token
- ❌ Access admin route with user token

#### Booking Tests:
- ✅ Create booking with available seats
- ❌ Create booking with taken seats
- ✅ Get user's booking history
- ❌ Access other user's bookings

#### Movie Tests:
- ✅ Get all movies (public)
- ✅ Get movie details (public)
- ✅ Create movie (admin only)
- ❌ Create movie (user role)

### 3. Data Validation Tests

#### Invalid Email Format:
```json
{
  "email": "invalid-email",
  "password": "password123"
}
```

#### Short Password:
```json
{
  "email": "test@example.com",
  "password": "123"
}
```

#### Missing Required Fields:
```json
{
  "email": "test@example.com"
  // Missing password
}
```

---

## 📊 Expected Responses

### Success Response Example:
```json
{
  "id": 1,
  "title": "Fast & Furious X",
  "description": "Action movie description",
  "genre": "Action",
  "duration": 142,
  "ageRating": "16+",
  "status": "active"
}
```

### Error Response Example:
```json
{
  "message": "Invalid credentials"
}
```

### Validation Error Example:
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## 🎯 Advanced Testing

### 1. Pagination Testing
```
GET /api/movies?page=1&limit=10
```

### 2. Filtering Testing
```
GET /api/movies?status=active&genre=Action
```

### 3. Search Testing
```
GET /api/movies?search=Fast
```

### 4. Sorting Testing
```
GET /api/movies?sort=title&order=asc
```

---

## 🔍 Debugging Tips

1. **Check Network Tab**: Xem actual HTTP requests
2. **Validate JSON**: Đảm bảo JSON format đúng
3. **Check Token Expiry**: JWT tokens có thể expire
4. **Verify Permissions**: Đảm bảo user có quyền truy cập
5. **Check Server Logs**: Xem logs để debug server-side issues

---

Swagger UI cung cấp môi trường testing hoàn chỉnh cho API, giúp developers và testers dễ dàng validate functionality và debug issues.
