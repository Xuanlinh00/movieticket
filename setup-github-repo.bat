@echo off
echo ========================================
echo    SETUP GITHUB REPOSITORY - NACINEMA
echo ========================================
echo.

echo This script will help you setup the GitHub repository for team collaboration.
echo Repository: https://github.com/Xuanlinh00/movieticket
echo.

:menu
echo Choose an option:
echo.
echo 1. Initialize local Git repository
echo 2. Add remote origin
echo 3. Create initial commit
echo 4. Setup team member access
echo 5. Create development branches
echo 6. Push to GitHub
echo 7. Complete setup (all steps)
echo.
echo 0. Exit
echo.
set /p choice="Enter your choice (0-7): "

if "%choice%"=="1" goto init_git
if "%choice%"=="2" goto add_remote
if "%choice%"=="3" goto initial_commit
if "%choice%"=="4" goto team_access
if "%choice%"=="5" goto create_branches
if "%choice%"=="6" goto push_github
if "%choice%"=="7" goto complete_setup
if "%choice%"=="0" goto end
goto menu

:init_git
echo.
echo === STEP 1: Initialize Git Repository ===
git init
git config user.name "NaCinema Team"
git config user.email "team@nacinema.com"
echo Git repository initialized!
goto menu

:add_remote
echo.
echo === STEP 2: Add Remote Origin ===
git remote add origin https://github.com/Xuanlinh00/movieticket.git
git remote -v
echo Remote origin added!
goto menu

:initial_commit
echo.
echo === STEP 3: Create Initial Commit ===
git add .
git commit -m "feat: initial project setup - NaCinema Movie Ticket Booking System

- Complete fullstack application with React + Node.js
- MongoDB database with comprehensive schemas
- Docker containerization for development and production
- Swagger API documentation
- Team collaboration structure

Contributors:
- Xuân Linh (Backend & API)
- Hoàng Hân (Frontend & UI)
- Kiên Thị (DevOps & Infrastructure)"
echo Initial commit created!
goto menu

:team_access
echo.
echo === STEP 4: Team Member Access Setup ===
echo.
echo Please ensure all team members have access to the repository:
echo.
echo 1. Xuân Linh (Owner): Xuanlinh00
echo    Email: xlinhhhh04@gmail.com
echo    Role: Admin (Full access)
echo.
echo 2. Hoàng Hân: hannechoioi  
echo    Email: phannguyenhoanghan@gmail.com
echo    Role: Collaborator (Push access)
echo.
echo 3. Kiên Thị: kienthibehaii
echo    Email: kienthibehai.dmx1234@gmail.com
echo    Role: Collaborator (Push access)
echo.
echo To add collaborators:
echo 1. Go to: https://github.com/Xuanlinh00/movieticket/settings/access
echo 2. Click "Add people"
echo 3. Enter their GitHub usernames
echo 4. Set role to "Write" for collaborators
echo.
pause
goto menu

:create_branches
echo.
echo === STEP 5: Create Development Branches ===
echo.
echo Creating feature branches for each team member...
echo.

echo Creating Xuân Linh's branches...
git checkout -b feature/backend-foundation
git checkout -b feature/api-development
git checkout -b feature/advanced-backend

echo Creating Hoàng Hân's branches...
git checkout -b feature/frontend-foundation
git checkout -b feature/ui-components
git checkout -b feature/user-interface

echo Creating Kiên Thị's branches...
git checkout -b feature/docker-setup
git checkout -b feature/infrastructure
git checkout -b feature/documentation

git checkout main
echo All feature branches created!
goto menu

:push_github
echo.
echo === STEP 6: Push to GitHub ===
git branch -M main
git push -u origin main

echo Pushing all branches...
git push origin feature/backend-foundation
git push origin feature/api-development
git push origin feature/advanced-backend
git push origin feature/frontend-foundation
git push origin feature/ui-components
git push origin feature/user-interface
git push origin feature/docker-setup
git push origin feature/infrastructure
git push origin feature/documentation

echo All branches pushed to GitHub!
goto menu

:complete_setup
echo.
echo === COMPLETE SETUP: Running all steps ===
echo.

echo Step 1: Initialize Git...
git init
git config user.name "NaCinema Team"
git config user.email "team@nacinema.com"

echo Step 2: Add remote...
git remote add origin https://github.com/Xuanlinh00/movieticket.git

echo Step 3: Initial commit...
git add .
git commit -m "feat: initial project setup - NaCinema Movie Ticket Booking System

- Complete fullstack application with React + Node.js
- MongoDB database with comprehensive schemas
- Docker containerization for development and production
- Swagger API documentation
- Team collaboration structure

Contributors:
- Xuân Linh (Backend & API)
- Hoàng Hân (Frontend & UI)  
- Kiên Thị (DevOps & Infrastructure)"

echo Step 4: Create branches...
git checkout -b feature/backend-foundation
git checkout -b feature/api-development
git checkout -b feature/advanced-backend
git checkout -b feature/frontend-foundation
git checkout -b feature/ui-components
git checkout -b feature/user-interface
git checkout -b feature/docker-setup
git checkout -b feature/infrastructure
git checkout -b feature/documentation
git checkout main

echo Step 5: Push to GitHub...
git branch -M main
git push -u origin main
git push origin feature/backend-foundation
git push origin feature/api-development
git push origin feature/advanced-backend
git push origin feature/frontend-foundation
git push origin feature/ui-components
git push origin feature/user-interface
git push origin feature/docker-setup
git push origin feature/infrastructure
git push origin feature/documentation

echo.
echo ========================================
echo    SETUP COMPLETED SUCCESSFULLY! 🎉
echo ========================================
echo.
echo Repository URL: https://github.com/Xuanlinh00/movieticket
echo.
echo Next steps:
echo 1. Add team members as collaborators
echo 2. Each member can start using their commit scripts
echo 3. Follow the TEAM_COMMIT_PLAN.md for organized commits
echo.
goto menu

:end
echo.
echo Setup script completed. Good luck with your project! 🚀
echo.
pause
