# 👥 Team Workflow - Movie Ticket Booking Project

## 🎯 **Team Members & Responsibilities**

### 👤 **Xuanlinh00** (Team Lead & Backend Core)
- **Email**: xlinhhhh04@gmail.com
- **GitHub**: Xuanlinh00
- **Role**: Team Lead, Authentication, Database, Admin Features
- **Branches**: `feature/xuanlinh-*`

### 👤 **hannechoioi** (Frontend Developer)
- **Email**: phannguyenhoanghan@gmail.com  
- **GitHub**: hannechoioi
- **Role**: UI/UX, React Components, Frontend Logic
- **Branches**: `feature/hannechoioi-*`

### 👤 **kienthibehaii** (Backend Developer)
- **Email**: kienthibehai.dmx1234@gmail.com
- **GitHub**: kienthibehaii
- **Role**: API Routes, Server Setup, Documentation
- **Branches**: `feature/kienthibehaii-*`

## 📋 **Detailed Task Distribution**

### 🔧 **Phase 1: Foundation (Commits 1-9)**

#### **Xuanlinh00 - Commits 1-3:**
```bash
# Commit 1: Project Setup
[XUANLINH] feat: initial project setup with Docker and TypeScript
Files: package.json, tsconfig.json, docker-compose.yml, Dockerfile, .env

# Commit 2: Database & Storage
[XUANLINH] feat: implement MongoDB storage and user models
Files: server/storage.ts, shared/schema.ts, database initialization

# Commit 3: Authentication System
[XUANLINH] feat: add JWT authentication and password hashing
Files: JWT middleware, bcrypt setup, user authentication logic
```

#### **hannechoioi - Commits 4-6:**
```bash
# Commit 4: Frontend Foundation
[HANNECHOIOI] feat: setup React app with Vite and Tailwind CSS
Files: client/index.html, client/src/main.tsx, Tailwind config

# Commit 5: Core UI Components
[HANNECHOIOI] ui: create base UI components and layout
Files: client/src/components/ui/, Header, Navigation, Footer

# Commit 6: Authentication UI
[HANNECHOIOI] ui: implement login/register forms and user interface
Files: Login/Register components, protected routes, user profile
```

#### **kienthibehaii - Commits 7-9:**
```bash
# Commit 7: Server Setup
[KIENTHIBEHAII] feat: setup Express server with middleware
Files: server/index.ts, server/vite.ts, middleware configuration

# Commit 8: API Routes Foundation
[KIENTHIBEHAII] api: implement basic API routes and error handling
Files: server/routes.ts, health check, error middleware

# Commit 9: Swagger Documentation
[KIENTHIBEHAII] docs: add Swagger API documentation
Files: server/swagger.ts, JSDoc annotations, API docs setup
```

### 🎬 **Phase 2: Movies & Cinema (Commits 10-18)**

#### **Xuanlinh00 - Commits 10-12:**
```bash
# Commit 10: Movies Backend Logic
[XUANLINH] feat: implement movies CRUD operations and validation
Files: Movie storage methods, validation schemas, file upload

# Commit 11: Cinema & Rooms Backend
[XUANLINH] feat: add cinema management and seat mapping system
Files: Cinema/Room storage, seat configuration, availability logic

# Commit 12: Admin Panel Backend
[XUANLINH] feat: implement admin authentication and management APIs
Files: Admin middleware, user management, admin-only routes
```

#### **hannechoioi - Commits 13-15:**
```bash
# Commit 13: Movies Frontend
[HANNECHOIOI] ui: create movie listing and detail pages
Files: client/src/pages/Movies.tsx, movie components, filtering

# Commit 14: Cinema Selection UI
[HANNECHOIOI] ui: implement cinema and seat selection interface
Files: Cinema listing, room layout, seat selection components

# Commit 15: Admin Panel Frontend
[HANNECHOIOI] ui: create admin panel interface and forms
Files: client/src/pages/AdminPanel.tsx, management forms
```

#### **kienthibehaii - Commits 16-18:**
```bash
# Commit 16: Movies API Routes
[KIENTHIBEHAII] api: implement movies CRUD endpoints with validation
Files: Movies API routes, search/filter endpoints, image upload

# Commit 17: Cinema API Routes
[KIENTHIBEHAII] api: add cinema and room management endpoints
Files: Cinema CRUD, room management, seat availability APIs

# Commit 18: Admin API Routes
[KIENTHIBEHAII] api: implement admin dashboard and management APIs
Files: Admin endpoints, user management, system statistics
```

### 🎫 **Phase 3: Booking & Showtimes (Commits 19-27)**

#### **Xuanlinh00 - Commits 19-21:**
```bash
# Commit 19: Showtimes Backend
[XUANLINH] feat: implement showtime scheduling and management
Files: Showtime storage, scheduling logic, conflict detection

# Commit 20: Booking System Backend
[XUANLINH] feat: add booking creation and payment processing
Files: Booking logic, payment integration, ticket generation

# Commit 21: Promotions System
[XUANLINH] feat: implement promo codes and discount system
Files: Promotion storage, discount calculation, validation
```

#### **hannechoioi - Commits 22-24:**
```bash
# Commit 22: Showtimes Frontend
[HANNECHOIOI] ui: create showtime selection and calendar interface
Files: Showtime components, calendar integration, time selection

# Commit 23: Booking Flow Frontend
[HANNECHOIOI] ui: implement booking form and payment interface
Files: BookingForm.tsx, payment forms, confirmation pages

# Commit 24: User Dashboard
[HANNECHOIOI] ui: create user dashboard and ticket management
Files: My tickets page, booking history, profile management
```

#### **kienthibehaii - Commits 25-27:**
```bash
# Commit 25: Showtimes API
[KIENTHIBEHAII] api: implement showtime CRUD and scheduling endpoints
Files: Showtime APIs, schedule management, conflict detection

# Commit 26: Booking API
[KIENTHIBEHAII] api: add booking creation and payment endpoints
Files: Booking APIs, payment processing, ticket management

# Commit 27: Promotions API
[KIENTHIBEHAII] api: implement promotion and discount endpoints
Files: Promo code APIs, discount application, analytics
```

### 🔧 **Phase 4: Advanced Features (Commits 28-36)**

#### **Xuanlinh00 - Commits 28-30:**
```bash
# Commit 28: Reviews & Ratings
[XUANLINH] feat: implement review system and rating calculations
Files: Review storage, rating aggregation, moderation

# Commit 29: Analytics & Reporting
[XUANLINH] feat: add analytics and reporting system
Files: Sales analytics, user tracking, performance metrics

# Commit 30: System Optimization
[XUANLINH] perf: optimize database queries and caching
Files: Database indexing, Redis caching, performance improvements
```

#### **hannechoioi - Commits 31-33:**
```bash
# Commit 31: Reviews UI
[HANNECHOIOI] ui: create review submission and display components
Files: Review forms, rating components, moderation interface

# Commit 32: Advanced UI Features
[HANNECHOIOI] ui: implement search, filters, and responsive design
Files: Search functionality, advanced filters, mobile optimization

# Commit 33: UX Polish
[HANNECHOIOI] ui: add loading states and error handling
Files: Loading components, error boundaries, accessibility
```

#### **kienthibehaii - Commits 34-36:**
```bash
# Commit 34: Reviews API
[KIENTHIBEHAII] api: implement review and rating endpoints
Files: Review CRUD, rating aggregation, moderation APIs

# Commit 35: Advanced API Features
[KIENTHIBEHAII] api: add search, pagination, and rate limiting
Files: Search APIs, pagination, rate limiting, optimization

# Commit 36: Documentation Complete
[KIENTHIBEHAII] docs: complete API documentation and testing
Files: Full Swagger docs, API tests, performance monitoring
```

## 🔄 **Git Workflow Process**

### **Daily Workflow:**
1. **Start of day**: `git pull origin develop`
2. **Switch to feature branch**: `git checkout feature/[member]-[feature]`
3. **Work on assigned tasks**
4. **Commit frequently**: `git commit -m "[MEMBER] [TYPE]: description"`
5. **Push to GitHub**: `git push origin feature/[member]-[feature]`
6. **Create Pull Request** when feature is complete

### **Pull Request Process:**
1. **Create PR** from feature branch to `develop`
2. **Add description** of changes and testing done
3. **Request review** from team lead (Xuanlinh00)
4. **Address feedback** if any
5. **Merge** after approval

### **Branch Protection Rules:**
- `main`: Requires PR review, no direct pushes
- `develop`: Requires PR review from team lead
- Feature branches: Free development

## 📊 **Progress Tracking**

### **Milestone 1** (Commits 1-9): Foundation ✅
- [ ] Project setup (Xuanlinh00)
- [ ] Frontend foundation (hannechoioi)  
- [ ] Server setup (kienthibehaii)

### **Milestone 2** (Commits 10-18): Core Features
- [ ] Movies & Cinema backend (Xuanlinh00)
- [ ] Movies & Cinema UI (hannechoioi)
- [ ] Movies & Cinema APIs (kienthibehaii)

### **Milestone 3** (Commits 19-27): Booking System
- [ ] Booking backend (Xuanlinh00)
- [ ] Booking UI (hannechoioi)
- [ ] Booking APIs (kienthibehaii)

### **Milestone 4** (Commits 28-36): Advanced Features
- [ ] System optimization (Xuanlinh00)
- [ ] UI polish (hannechoioi)
- [ ] Documentation (kienthibehaii)

## 🚀 **Getting Started**

1. **Clone repository**: `git clone https://github.com/Xuanlinh00/movieticket.git`
2. **Run setup script**: `bash scripts/setup-git-workflow.sh`
3. **Switch to your feature branch**: `git checkout feature/[member]-[feature]`
4. **Start coding** according to your assigned tasks!

## 📞 **Communication**

- **Daily standup**: Share progress and blockers
- **Code reviews**: Constructive feedback on PRs
- **Documentation**: Update docs for new features
- **Testing**: Test your changes before committing
