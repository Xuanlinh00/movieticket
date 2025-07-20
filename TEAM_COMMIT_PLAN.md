# 🚀 Kế Hoạch Chia Code Commit - NaCinema Team

## 👥 Thông Tin Team

| Thành viên | GitHub Username | Email | Vai trò chính |
|------------|----------------|-------|---------------|
| **Xuân Linh** | Xuanlinh00 | xlinhhhh04@gmail.com | **Team Lead & Backend** |
| **Hoàng Hân** | hannechoioi | phannguyenhoanghan@gmail.com | **Frontend & UI/UX** |
| **Kiên Thị** | kienthibehaii | kienthibehai.dmx1234@gmail.com | **DevOps & Database** |

**Repository**: https://github.com/Xuanlinh00/movieticket

---

## 📋 Phân Chia Trách Nhiệm Chính

### 🎯 Xuân Linh (Team Lead & Backend)
**Chuyên trách**: Backend API, Authentication, Business Logic

**Modules phụ trách**:
- `server/` - Toàn bộ backend logic
- `shared/schema.ts` - Database schemas
- API endpoints và middleware
- Authentication & Authorization
- Database integration

### 🎨 Hoàng Hân (Frontend & UI/UX)
**Chuyên trách**: Frontend Components, UI/UX, User Experience

**Modules phụ trách**:
- `client/src/components/` - UI Components
- `client/src/pages/` - Page components
- `client/src/lib/` - Frontend utilities
- Styling và responsive design
- User interface optimization

### ⚙️ Kiên Thị (DevOps & Database)
**Chuyên trách**: DevOps, Database, Configuration, Documentation

**Modules phụ trách**:
- Docker configuration
- Database setup và migration
- Configuration files
- Documentation
- Performance optimization

---

## 📅 Kế Hoạch Commit Chi Tiết (30 commits)

### 🔄 Phase 1: Initial Setup & Core Structure (10 commits)

#### Commits 1-3: Xuân Linh (Backend Foundation)
```bash
# Commit 1: Initial backend setup
git add server/index.ts server/vite.ts package.json
git commit -m "feat: initial backend server setup with Express and Vite integration"

# Commit 2: Database connection and schemas
git add server/mongodb.ts server/storage.ts shared/schema.ts
git commit -m "feat: add MongoDB connection and database schemas"

# Commit 3: Authentication system
git add server/routes.ts (auth endpoints only)
git commit -m "feat: implement JWT authentication and user registration"
```

#### Commits 4-6: Hoàng Hân (Frontend Foundation)
```bash
# Commit 4: React app setup
git add client/src/main.tsx client/src/App.tsx client/index.html
git commit -m "feat: initialize React app with TypeScript and routing"

# Commit 5: UI components library
git add client/src/components/ui/ components.json tailwind.config.ts
git commit -m "feat: setup Tailwind CSS and shadcn/ui component library"

# Commit 6: Authentication pages
git add client/src/pages/Login.tsx client/src/pages/Register.tsx client/src/lib/auth.ts
git commit -m "feat: create login and registration pages with form validation"
```

#### Commits 7-10: Kiên Thị (DevOps & Config)
```bash
# Commit 7: Docker setup
git add Dockerfile docker-compose.yml Dockerfile.dev
git commit -m "feat: add Docker containerization for development and production"

# Commit 8: Database initialization
git add mongo-init.js debug-mongo.js
git commit -m "feat: setup MongoDB initialization and seeding scripts"

# Commit 9: Development tools
git add start-dev.bat stop-dev.bat kill-port.bat docker-scripts.sh
git commit -m "feat: add development automation scripts and tools"

# Commit 10: Configuration files
git add tsconfig.json vite.config.ts postcss.config.js drizzle.config.ts
git commit -m "feat: configure TypeScript, Vite, and build tools"
```

### 🎬 Phase 2: Core Features (10 commits)

#### Commits 11-14: Xuân Linh (API Development)
```bash
# Commit 11: Movies API
git add server/routes.ts (movies endpoints)
git commit -m "feat: implement movies CRUD API endpoints"

# Commit 12: Cinemas and Rooms API
git add server/routes.ts (cinemas, rooms endpoints)
git commit -m "feat: add cinemas and rooms management API"

# Commit 13: Showtimes API
git add server/routes.ts (showtimes endpoints)
git commit -m "feat: implement showtimes scheduling API"

# Commit 14: Booking system API
git add server/routes.ts (bookings, tickets endpoints)
git commit -m "feat: create booking and ticket management system"
```

#### Commits 15-18: Hoàng Hân (Frontend Features)
```bash
# Commit 15: Movie components
git add client/src/components/MovieCard.tsx client/src/pages/Home.tsx
git commit -m "feat: create movie display components and home page"

# Commit 16: Movie detail page
git add client/src/pages/MovieDetail.tsx client/src/components/MovieReviews.tsx
git commit -m "feat: implement movie detail page with reviews system"

# Commit 17: Booking interface
git add client/src/components/SeatMap.tsx client/src/components/BookingForm.tsx
git commit -m "feat: create seat selection and booking form components"

# Commit 18: Navigation and layout
git add client/src/components/Navigation.tsx client/src/lib/utils.ts
git commit -m "feat: implement navigation system and utility functions"
```

#### Commits 19-20: Kiên Thị (Infrastructure)
```bash
# Commit 19: Nginx configuration
git add nginx.conf docker-compose.yml (nginx service)
git commit -m "feat: add Nginx reverse proxy configuration"

# Commit 20: Performance monitoring
git add performance/ logs/
git commit -m "feat: setup performance monitoring and logging system"
```

### 🔧 Phase 3: Advanced Features & Polish (10 commits)

#### Commits 21-24: Xuân Linh (Advanced Backend)
```bash
# Commit 21: Admin panel API
git add server/routes.ts (admin endpoints)
git commit -m "feat: implement admin panel API with role-based access"

# Commit 22: Reviews and ratings API
git add server/routes.ts (reviews endpoints)
git commit -m "feat: add movie reviews and ratings system"

# Commit 23: Swagger documentation
git add server/swagger.ts server/swagger-docs.ts
git commit -m "feat: integrate Swagger API documentation"

# Commit 24: Error handling and validation
git add server/routes.ts (error handling improvements)
git commit -m "feat: enhance error handling and input validation"
```

#### Commits 25-27: Hoàng Hân (UI Polish)
```bash
# Commit 25: Admin dashboard
git add client/src/pages/AdminPanel.tsx client/src/pages/StaffPanel.tsx
git commit -m "feat: create admin and staff management dashboards"

# Commit 26: User dashboard
git add client/src/pages/Dashboard.tsx client/src/hooks/
git commit -m "feat: implement user dashboard with booking history"

# Commit 27: Additional pages
git add client/src/pages/Cinemas.tsx client/src/pages/ComingSoon.tsx client/src/pages/Promotions.tsx
git commit -m "feat: add cinemas, coming soon, and promotions pages"
```

#### Commits 28-30: Kiên Thị (Final Polish)
```bash
# Commit 28: Documentation
git add README.md SETUP_GUIDE.md DOCKER_GUIDE.md SWAGGER_GUIDE.md
git commit -m "docs: comprehensive project documentation and guides"

# Commit 29: SSL and security
git add ssl/ nginx.conf (SSL config)
git commit -m "feat: add SSL configuration and security enhancements"

# Commit 30: Final optimizations
git add package.json (final dependencies) .gitignore
git commit -m "feat: final optimizations and production readiness"
```

---

## 🔄 Commit Schedule (Đề xuất)

### Tuần 1: Foundation (Commits 1-10)
- **Thứ 2**: Xuân Linh - Commits 1-2
- **Thứ 3**: Hoàng Hân - Commits 4-5  
- **Thứ 4**: Kiên Thị - Commits 7-8
- **Thứ 5**: Xuân Linh - Commit 3
- **Thứ 6**: Hoàng Hân - Commit 6
- **Thứ 7**: Kiên Thị - Commits 9-10

### Tuần 2: Core Features (Commits 11-20)
- **Thứ 2**: Xuân Linh - Commits 11-12
- **Thứ 3**: Hoàng Hân - Commits 15-16
- **Thứ 4**: Kiên Thị - Commit 19
- **Thứ 5**: Xuân Linh - Commits 13-14
- **Thứ 6**: Hoàng Hân - Commits 17-18
- **Thứ 7**: Kiên Thị - Commit 20

### Tuần 3: Advanced Features (Commits 21-30)
- **Thứ 2**: Xuân Linh - Commits 21-22
- **Thứ 3**: Hoàng Hân - Commits 25-26
- **Thứ 4**: Kiên Thị - Commit 28
- **Thứ 5**: Xuân Linh - Commits 23-24
- **Thứ 6**: Hoàng Hân - Commit 27
- **Thứ 7**: Kiên Thị - Commits 29-30

---

## 📝 Commit Message Convention

### Format:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples:
```bash
feat(auth): implement JWT authentication system
fix(booking): resolve seat selection validation issue
docs(api): add Swagger documentation for movies endpoint
style(ui): improve responsive design for mobile devices
```

---

## 🔧 Git Workflow

### 1. Clone Repository
```bash
git clone https://github.com/Xuanlinh00/movieticket.git
cd movieticket
```

### 2. Create Feature Branches
```bash
# Xuân Linh
git checkout -b feature/backend-auth
git checkout -b feature/api-endpoints

# Hoàng Hân  
git checkout -b feature/frontend-components
git checkout -b feature/ui-pages

# Kiên Thị
git checkout -b feature/docker-setup
git checkout -b feature/documentation
```

### 3. Commit và Push
```bash
git add .
git commit -m "feat(auth): implement user registration system"
git push origin feature/backend-auth
```

### 4. Create Pull Requests
- Tạo PR từ feature branch về main
- Review code của nhau
- Merge sau khi approve

---

## 📊 Contribution Statistics Target

| Thành viên | Commits | Lines of Code | Files |
|------------|---------|---------------|-------|
| Xuân Linh | 10 (33%) | ~2000 lines | Backend files |
| Hoàng Hân | 10 (33%) | ~1800 lines | Frontend files |
| Kiên Thị | 10 (33%) | ~800 lines | Config & docs |

**Total**: 30 commits, ~4600 lines of code

---

Kế hoạch này đảm bảo mỗi thành viên có đóng góp đều đặn và phù hợp với chuyên môn của họ!
