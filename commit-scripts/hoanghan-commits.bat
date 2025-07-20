@echo off
echo ========================================
echo   HOANG HAN COMMIT SCRIPTS - FRONTEND
echo ========================================
echo.

:menu
echo Choose your commit:
echo.
echo === PHASE 1: FRONTEND FOUNDATION ===
echo 1. React app setup
echo 2. UI components library
echo 3. Authentication pages
echo.
echo === PHASE 2: CORE FEATURES ===
echo 4. Movie components
echo 5. Movie detail page
echo 6. Booking interface
echo 7. Navigation and layout
echo.
echo === PHASE 3: UI POLISH ===
echo 8. Admin dashboard
echo 9. User dashboard
echo 10. Additional pages
echo.
echo 0. Exit
echo.
set /p choice="Enter your choice (0-10): "

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
if "%choice%"=="0" goto end
goto menu

:commit1
echo.
echo === COMMIT 1: React app setup ===
git add client/src/main.tsx client/src/App.tsx client/index.html client/src/index.css
git commit -m "feat: initialize React app with TypeScript and routing

- Setup React 18 with TypeScript
- Configure Wouter for client-side routing
- Add global CSS styles with Tailwind
- Implement basic app structure and layout
- Setup development environment

Author: Hoàng Hân <phannguyenhoanghan@gmail.com>"
echo Commit 1 completed!
goto menu

:commit2
echo.
echo === COMMIT 2: UI components library ===
git add client/src/components/ui/ components.json tailwind.config.ts
git commit -m "feat: setup Tailwind CSS and shadcn/ui component library

- Configure Tailwind CSS with custom design system
- Integrate shadcn/ui component library
- Setup dark/light theme support
- Create reusable UI components (Button, Input, Card, etc.)
- Configure responsive design utilities

Author: Hoàng Hân <phannguyenhoanghan@gmail.com>"
echo Commit 2 completed!
goto menu

:commit3
echo.
echo === COMMIT 3: Authentication pages ===
git add client/src/pages/Login.tsx client/src/pages/Register.tsx client/src/lib/auth.ts
git commit -m "feat: create login and registration pages with form validation

- Implement login page with form validation
- Create user registration form
- Add React Hook Form integration
- Setup authentication utilities
- Implement form error handling and UX

Author: Hoàng Hân <phannguyenhoanghan@gmail.com>"
echo Commit 3 completed!
goto menu

:commit4
echo.
echo === COMMIT 4: Movie components ===
git add client/src/components/MovieCard.tsx client/src/pages/Home.tsx
git commit -m "feat: create movie display components and home page

- Design MovieCard component with poster and details
- Implement Home page with movie grid layout
- Add movie filtering and search functionality
- Create responsive movie listings
- Setup movie status indicators (active, coming soon)

Author: Hoàng Hân <phannguyenhoanghan@gmail.com>"
echo Commit 4 completed!
goto menu

:commit5
echo.
echo === COMMIT 5: Movie detail page ===
git add client/src/pages/MovieDetail.tsx client/src/components/MovieReviews.tsx
git commit -m "feat: implement movie detail page with reviews system

- Create comprehensive movie detail page
- Add movie trailer integration
- Implement reviews and ratings display
- Create showtime selection interface
- Add movie information layout (cast, director, etc.)

Author: Hoàng Hân <phannguyenhoanghan@gmail.com>"
echo Commit 5 completed!
goto menu

:commit6
echo.
echo === COMMIT 6: Booking interface ===
git add client/src/components/SeatMap.tsx client/src/components/BookingForm.tsx
git commit -m "feat: create seat selection and booking form components

- Implement interactive seat map component
- Create booking form with customer information
- Add seat selection validation
- Setup payment method selection
- Implement booking confirmation flow

Author: Hoàng Hân <phannguyenhoanghan@gmail.com>"
echo Commit 6 completed!
goto menu

:commit7
echo.
echo === COMMIT 7: Navigation and layout ===
git add client/src/components/Navigation.tsx client/src/lib/utils.ts client/src/lib/types.ts
git commit -m "feat: implement navigation system and utility functions

- Create responsive navigation component
- Add user authentication state management
- Implement role-based navigation items
- Setup utility functions for common operations
- Add TypeScript type definitions

Author: Hoàng Hân <phannguyenhoanghan@gmail.com>"
echo Commit 7 completed!
goto menu

:commit8
echo.
echo === COMMIT 8: Admin dashboard ===
git add client/src/pages/AdminPanel.tsx client/src/pages/StaffPanel.tsx
git commit -m "feat: create admin and staff management dashboards

- Implement comprehensive admin panel
- Create staff management interface
- Add movie management for admins
- Setup user role management
- Create analytics and reporting views

Author: Hoàng Hân <phannguyenhoanghan@gmail.com>"
echo Commit 8 completed!
goto menu

:commit9
echo.
echo === COMMIT 9: User dashboard ===
git add client/src/pages/Dashboard.tsx client/src/hooks/use-toast.ts client/src/hooks/use-mobile.tsx
git commit -m "feat: implement user dashboard with booking history

- Create user profile and dashboard
- Add booking history with ticket details
- Implement custom React hooks
- Setup toast notifications system
- Add mobile-responsive design hooks

Author: Hoàng Hân <phannguyenhoanghan@gmail.com>"
echo Commit 9 completed!
goto menu

:commit10
echo.
echo === COMMIT 10: Additional pages ===
git add client/src/pages/Cinemas.tsx client/src/pages/ComingSoon.tsx client/src/pages/Promotions.tsx client/src/pages/not-found.tsx
git commit -m "feat: add cinemas, coming soon, and promotions pages

- Create cinemas listing page with locations
- Implement coming soon movies page
- Add promotions and offers page
- Create 404 not found page
- Setup page transitions and loading states

Author: Hoàng Hân <phannguyenhoanghan@gmail.com>"
echo Commit 10 completed!
goto menu

:end
echo.
echo All commits completed! Excellent work, Hoàng Hân! 🎨
echo.
pause
