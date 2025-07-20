# 📚 Swagger API Documentation Guide - NaCinema

## 🎯 Tổng quan

Swagger đã được tích hợp vào dự án NaCinema để cung cấp documentation tự động cho API. Swagger UI cho phép developers và testers dễ dàng khám phá, test và hiểu các API endpoints.

---

## 🚀 Cách sử dụng

### Truy cập Swagger UI

1. **Development Mode:**
   ```bash
   npm run dev
   ```
   Truy cập: http://localhost:5000/api-docs

2. **Production Mode:**
   ```bash
   npm run build
   npm start
   ```
   Truy cập: http://localhost:5000/api-docs

### API Specification JSON

- **JSON Endpoint**: http://localhost:5000/api-docs.json
- **Download**: Có thể download file JSON để import vào Postman hoặc các tools khác

---

## 📖 Cấu trúc Documentation

### Authentication

- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`

### Movies

- **Get All Movies**: `GET /api/movies`
- **Get Movie by ID**: `GET /api/movies/{id}`
- **Create Movie** (Admin): `POST /api/admin/movies`
- **Update Movie** (Admin): `PUT /api/admin/movies/{id}`
- **Delete Movie** (Admin): `DELETE /api/admin/movies/{id}`

### Cinemas

- **Get All Cinemas**: `GET /api/cinemas`
- **Get Cinema by ID**: `GET /api/cinemas/{id}`

### Bookings & Tickets

- **Create Booking**: `POST /api/bookings`
- **Get User Tickets**: `GET /api/tickets`

### Admin Endpoints

- **Get All Users**: `GET /api/admin/users`
- **Update User Role**: `PUT /api/admin/users/{id}/role`

---

## 🔐 Authentication trong Swagger

### Cách test API với JWT Token:

1. **Đăng ký/Đăng nhập** để lấy JWT token
2. **Copy token** từ response
3. **Click "Authorize"** button ở đầu Swagger UI
4. **Nhập token** theo format: `Bearer your-jwt-token-here`
5. **Click "Authorize"** để apply token cho tất cả requests

### Ví dụ:
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🛠️ Cấu hình Swagger

### File cấu hình chính: `server/swagger.ts`

```typescript
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NaCinema API Documentation',
      version: '1.0.0',
      description: 'API documentation for NaCinema - Movie Ticket Booking System',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    './server/routes.ts',
    './server/swagger-docs.ts',
  ],
};
```

### Schemas được định nghĩa:

- **User**: User information schema
- **Movie**: Movie details schema
- **Cinema**: Cinema information schema
- **Ticket**: Ticket booking schema
- **Error**: Error response schema

---

## 📝 Thêm Documentation cho Endpoints mới

### Cách thêm Swagger comments:

1. **Tạo comment block** trước endpoint:

```typescript
/**
 * @swagger
 * /api/new-endpoint:
 *   post:
 *     summary: Description of endpoint
 *     tags: [TagName]
 *     security:
 *       - bearerAuth: []
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
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchemaName'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/api/new-endpoint', (req, res) => {
  // Implementation
});
```

2. **Thêm vào file** `server/swagger-docs.ts` hoặc trực tiếp trong routes

---

## 🎨 Customization

### Swagger UI Customization

```typescript
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'NaCinema API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
  },
}));
```

### Thêm Custom CSS:

```css
.swagger-ui .topbar { 
  display: none; 
}
.swagger-ui .info {
  margin: 50px 0;
}
.swagger-ui .scheme-container {
  background: #fafafa;
  padding: 30px 0;
}
```

---

## 🔧 Troubleshooting

### Lỗi thường gặp:

1. **Swagger UI không load:**
   - Kiểm tra dependencies đã install: `npm install`
   - Restart server: `npm run dev`

2. **API docs không hiển thị:**
   - Kiểm tra file paths trong `swagger.ts`
   - Đảm bảo import `swagger-docs.ts` trong routes

3. **Authentication không work:**
   - Kiểm tra JWT token format
   - Đảm bảo token chưa expired

4. **Schema validation errors:**
   - Kiểm tra Swagger comments syntax
   - Validate JSON schema format

---

## 📚 Resources

- **Swagger/OpenAPI Specification**: https://swagger.io/specification/
- **swagger-jsdoc Documentation**: https://github.com/Surnet/swagger-jsdoc
- **swagger-ui-express**: https://github.com/scottie1984/swagger-ui-express

---

## 🎯 Best Practices

1. **Consistent Naming**: Sử dụng naming convention nhất quán
2. **Detailed Descriptions**: Mô tả rõ ràng cho mỗi endpoint
3. **Example Values**: Cung cấp example values cho parameters
4. **Error Responses**: Document tất cả possible error responses
5. **Security**: Specify security requirements cho protected endpoints
6. **Tags**: Sử dụng tags để group related endpoints
7. **Schemas**: Reuse schemas thay vì duplicate definitions

---

Swagger documentation giúp team development hiểu và sử dụng API một cách hiệu quả, đồng thời cung cấp testing interface trực tiếp từ browser.
