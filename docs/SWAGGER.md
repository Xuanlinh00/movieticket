# 📚 Swagger API Documentation

## 🚀 **Truy cập Swagger UI**

### **URLs:**
- **Swagger UI**: http://localhost:5000/api-docs
- **Swagger JSON**: http://localhost:5000/api/swagger.json
- **Qua Nginx**: http://localhost/api-docs

## 🔧 **Cấu hình Swagger**

### **Packages đã cài đặt:**
```bash
npm install swagger-ui-express swagger-jsdoc
npm install --save-dev @types/swagger-ui-express @types/swagger-jsdoc
```

### **Files cấu hình:**
- `server/swagger.ts` - Cấu hình chính
- `server/routes.ts` - JSDoc annotations cho endpoints
- `server/index.ts` - Tích hợp vào Express app

## 📋 **API Documentation có sẵn**

### **✅ Đã có documentation:**

#### **🔐 Authentication**
- `POST /api/auth/login` - User login với JWT token

#### **🎬 Movies**
- `GET /api/movies` - Lấy danh sách phim
- `POST /api/movies` - Tạo phim mới (Admin only)

#### **🏥 Health Check**
- `GET /api/health` - Kiểm tra trạng thái server

### **🔄 Cần thêm documentation:**
- Cinemas endpoints
- Showtimes endpoints  
- Bookings endpoints
- Reviews endpoints
- Admin endpoints

## 🎯 **Cách sử dụng Swagger UI**

### **1. Authentication:**
1. Mở Swagger UI: http://localhost:5000/api-docs
2. Tìm endpoint `POST /api/auth/login`
3. Click **"Try it out"**
4. Nhập credentials:
   ```json
   {
     "email": "admin@cinemabook.vn",
     "password": "password"
   }
   ```
5. Click **"Execute"**
6. Copy `token` từ response
7. Click **"Authorize"** button (🔒) ở đầu trang
8. Nhập: `Bearer <your-token>`
9. Click **"Authorize"**

### **2. Test APIs:**
- Tất cả endpoints có 🔒 cần authentication
- Public endpoints: Movies (GET), Health check
- Admin endpoints: Movies (POST), Admin routes

### **3. Schema References:**
- `User` - Thông tin user
- `Movie` - Thông tin phim
- `Cinema` - Thông tin rạp
- `Booking` - Thông tin đặt vé
- `Error` - Format lỗi chuẩn

## 🔧 **Thêm documentation cho endpoint mới**

### **Template JSDoc:**
```javascript
/**
 * @swagger
 * /api/your-endpoint:
 *   post:
 *     summary: Mô tả ngắn
 *     description: Mô tả chi tiết
 *     tags: [Tag Name]
 *     security:
 *       - bearerAuth: []  # Nếu cần authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *                 example: "example value"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/YourSchema'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
```

### **Thêm Schema mới:**
Chỉnh sửa `server/swagger.ts` trong phần `components.schemas`:

```typescript
YourNewSchema: {
  type: 'object',
  properties: {
    id: { type: 'integer', example: 1 },
    name: { type: 'string', example: 'Example' },
    // ... other properties
  },
}
```

## 🎨 **Customization**

### **Swagger UI Options:**
```typescript
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,                    // Enable API explorer
  customCss: '.swagger-ui .topbar { display: none }',  // Hide topbar
  customSiteTitle: 'Your API Docs', // Custom title
  customfavIcon: '/favicon.ico',    // Custom favicon
}));
```

### **OpenAPI Info:**
```typescript
info: {
  title: 'Movie Ticket Booking API',
  version: '1.0.0',
  description: 'API documentation for Movie Ticket Booking System',
  contact: {
    name: 'API Support',
    email: 'support@nacinema.com',
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT',
  },
}
```

## 🚨 **Troubleshooting**

### **Swagger UI không load:**
1. Kiểm tra server đang chạy: `curl http://localhost:5000/api/health`
2. Kiểm tra logs: `docker logs minicinema_app`
3. Thử truy cập trực tiếp: http://localhost:5000/api-docs

### **Authentication không hoạt động:**
1. Đảm bảo đã login và copy đúng token
2. Format: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. Token có thời hạn 24h

### **Schema không hiển thị:**
1. Kiểm tra syntax JSDoc
2. Đảm bảo file được include trong `apis` array
3. Restart server sau khi thay đổi

## 📈 **Next Steps**

1. **Thêm documentation cho tất cả endpoints**
2. **Tạo example requests/responses**
3. **Thêm error codes chi tiết**
4. **Setup automated API testing**
5. **Export Postman collection từ Swagger**

## 🔗 **Useful Links**

- [Swagger/OpenAPI Specification](https://swagger.io/specification/)
- [swagger-jsdoc Documentation](https://github.com/Surnet/swagger-jsdoc)
- [swagger-ui-express Documentation](https://github.com/scottie1984/swagger-ui-express)
