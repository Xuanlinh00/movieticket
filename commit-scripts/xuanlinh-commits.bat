@echo off
echo ========================================
echo    XUANLINH COMMIT SCRIPTS - BACKEND
echo ========================================
echo.

:menu
echo Choose your commit:
echo.
echo === PHASE 1: BACKEND FOUNDATION ===
echo 1. Initial backend setup
echo 2. Database connection and schemas  
echo 3. Authentication system
echo.
echo === PHASE 2: API DEVELOPMENT ===
echo 4. Movies API endpoints
echo 5. Cinemas and Rooms API
echo 6. Showtimes API
echo 7. Booking system API
echo.
echo === PHASE 3: ADVANCED BACKEND ===
echo 8. Admin panel API
echo 9. Reviews and ratings API
echo 10. Swagger documentation
echo 11. Error handling and validation
echo.
echo 0. Exit
echo.
set /p choice="Enter your choice (0-11): "

if "%choice%"=="1" goto commit1
if "%choice%"=="2" goto commit2
if "%choice%"=="3" goto commit3
if "%choice%"=="4" goto commit4
if "%choice%"=="5" goto commit5
if "%choice%"=="6" goto commit6
if "%choice%"=="7" goto commit7
if "%choice%"=="8" goto commit8
if "%choice%"=="9" goto commit9
if "%choice%"=="10" goto commit10
if "%choice%"=="11" goto commit11
if "%choice%"=="0" goto end
goto menu

:commit1
echo.
echo === COMMIT 1: Initial backend setup ===
git add server/index.ts server/vite.ts package.json
git commit -m "feat: initial backend server setup with Express and Vite integration

- Setup Express.js server with TypeScript
- Integrate Vite for development and production builds
- Configure middleware for JSON parsing and logging
- Add graceful shutdown handling
- Setup basic error handling middleware

Author: Xuân Linh <xlinhhhh04@gmail.com>"
echo Commit 1 completed!
goto menu

:commit2
echo.
echo === COMMIT 2: Database connection and schemas ===
git add server/mongodb.ts server/storage.ts shared/schema.ts
git commit -m "feat: add MongoDB connection and database schemas

- Implement MongoDB connection with connection pooling
- Create comprehensive database schemas using Drizzle ORM
- Setup data access layer with storage interface
- Add database initialization and seeding
- Configure indexes for performance optimization

Author: Xuân Linh <xlinhhhh04@gmail.com>"
echo Commit 2 completed!
goto menu

:commit3
echo.
echo === COMMIT 3: Authentication system ===
git add server/routes.ts
git commit -m "feat: implement JWT authentication and user registration

- Add user registration with password hashing (bcrypt)
- Implement JWT-based authentication system
- Create login endpoint with credential validation
- Add middleware for token verification
- Setup role-based access control (user, staff, admin)

Author: Xuân Linh <xlinhhhh04@gmail.com>"
echo Commit 3 completed!
goto menu

:commit4
echo.
echo === COMMIT 4: Movies API endpoints ===
git add server/routes.ts
git commit -m "feat: implement movies CRUD API endpoints

- Create GET /api/movies for listing all movies
- Add GET /api/movies/:id for movie details
- Implement movie filtering by status and genre
- Add movie search functionality
- Setup proper error handling for movie operations

Author: Xuân Linh <xlinhhhh04@gmail.com>"
echo Commit 4 completed!
goto menu

:commit5
echo.
echo === COMMIT 5: Cinemas and Rooms API ===
git add server/routes.ts
git commit -m "feat: add cinemas and rooms management API

- Implement GET /api/cinemas for cinema listings
- Add GET /api/cinemas/:id for cinema details
- Create rooms management endpoints
- Setup cinema-room relationships
- Add seat layout configuration support

Author: Xuân Linh <xlinhhhh04@gmail.com>"
echo Commit 5 completed!
goto menu

:commit6
echo.
echo === COMMIT 6: Showtimes API ===
git add server/routes.ts
git commit -m "feat: implement showtimes scheduling API

- Create GET /api/showtimes for showtime listings
- Add showtime filtering by movie and cinema
- Implement seat availability tracking
- Setup showtime-movie-cinema relationships
- Add date-based showtime queries

Author: Xuân Linh <xlinhhhh04@gmail.com>"
echo Commit 6 completed!
goto menu

:commit7
echo.
echo === COMMIT 7: Booking system API ===
git add server/routes.ts
git commit -m "feat: create booking and ticket management system

- Implement POST /api/bookings for ticket booking
- Add GET /api/tickets for user ticket history
- Create seat reservation logic
- Setup booking validation and conflict prevention
- Add payment method integration support

Author: Xuân Linh <xlinhhhh04@gmail.com>"
echo Commit 7 completed!
goto menu

:commit8
echo.
echo === COMMIT 8: Admin panel API ===
git add server/routes.ts
git commit -m "feat: implement admin panel API with role-based access

- Create admin-only movie management endpoints
- Add user management API for admins
- Implement cinema and room administration
- Setup staff management functionality
- Add comprehensive admin dashboard data endpoints

Author: Xuân Linh <xlinhhhh04@gmail.com>"
echo Commit 8 completed!
goto menu

:commit9
echo.
echo === COMMIT 9: Reviews and ratings API ===
git add server/routes.ts
git commit -m "feat: add movie reviews and ratings system

- Implement POST /api/reviews for movie reviews
- Add GET /api/movies/:id/reviews for review listings
- Create rating aggregation system
- Setup review moderation for admins
- Add user review history endpoints

Author: Xuân Linh <xlinhhhh04@gmail.com>"
echo Commit 9 completed!
goto menu

:commit10
echo.
echo === COMMIT 10: Swagger documentation ===
git add server/swagger.ts server/swagger-docs.ts SWAGGER_GUIDE.md
git commit -m "feat: integrate Swagger API documentation

- Setup Swagger UI at /api-docs endpoint
- Create comprehensive API documentation
- Add request/response schemas
- Implement JWT authentication in Swagger
- Create detailed API testing guide

Author: Xuân Linh <xlinhhhh04@gmail.com>"
echo Commit 10 completed!
goto menu

:commit11
echo.
echo === COMMIT 11: Error handling and validation ===
git add server/routes.ts server/index.ts
git commit -m "feat: enhance error handling and input validation

- Improve global error handling middleware
- Add comprehensive input validation with Zod
- Implement proper HTTP status codes
- Setup detailed error logging
- Add request validation for all endpoints

Author: Xuân Linh <xlinhhhh04@gmail.com>"
echo Commit 11 completed!
goto menu

:end
echo.
echo All commits completed! Great work, Xuân Linh! 🚀
echo.
pause
