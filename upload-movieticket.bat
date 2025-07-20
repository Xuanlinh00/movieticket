@echo off
echo 🚀 Uploading Movie Ticket Booking project to GitHub...

REM Reset git completely
echo 🔄 Resetting git repository...
rmdir /s /q .git 2>nul
git init

REM Add remote
echo 📡 Adding remote origin...
git remote add origin https://github.com/Xuanlinh00/movieticket.git

REM Add all files
echo 📁 Adding all files...
git add .

REM Create initial commit
echo 💾 Creating initial commit...
git commit -m "[XUANLINH] feat: complete Movie Ticket Booking system with Docker, React, TypeScript, MongoDB"

REM Create and push main branch
echo 🌿 Creating main branch...
git branch -M main
git push -u origin main --force

REM Create develop branch
echo 🌿 Creating develop branch...
git checkout -b develop
git push -u origin develop

REM Create feature branches for team members
echo 🌿 Creating feature branches...

REM Xuanlinh00 branches
git checkout -b feature/xuanlinh-auth
git push -u origin feature/xuanlinh-auth

git checkout -b feature/xuanlinh-database  
git push -u origin feature/xuanlinh-database

git checkout -b feature/xuanlinh-admin
git push -u origin feature/xuanlinh-admin

REM hannechoioi branches
git checkout -b feature/hannechoioi-ui-foundation
git push -u origin feature/hannechoioi-ui-foundation

git checkout -b feature/hannechoioi-movies-ui
git push -u origin feature/hannechoioi-movies-ui

git checkout -b feature/hannechoioi-booking-ui
git push -u origin feature/hannechoioi-booking-ui

REM kienthibehaii branches
git checkout -b feature/kienthibehaii-server-setup
git push -u origin feature/kienthibehaii-server-setup

git checkout -b feature/kienthibehaii-api-routes
git push -u origin feature/kienthibehaii-api-routes

git checkout -b feature/kienthibehaii-swagger
git push -u origin feature/kienthibehaii-swagger

REM Switch back to main
git checkout main

echo ✅ Upload complete!
echo.
echo 📋 Repository setup:
echo 🌐 URL: https://github.com/Xuanlinh00/movieticket
echo 🌿 Main branch: main
echo 🌿 Development branch: develop
echo.
echo 👥 Team member branches created:
echo.
echo 👤 Xuanlinh00 (Team Lead):
echo    - feature/xuanlinh-auth
echo    - feature/xuanlinh-database  
echo    - feature/xuanlinh-admin
echo.
echo 👤 hannechoioi (Frontend):
echo    - feature/hannechoioi-ui-foundation
echo    - feature/hannechoioi-movies-ui
echo    - feature/hannechoioi-booking-ui
echo.
echo 👤 kienthibehaii (Backend):
echo    - feature/kienthibehaii-server-setup
echo    - feature/kienthibehaii-api-routes
echo    - feature/kienthibehaii-swagger
echo.
echo 🔄 Next steps:
echo 1. Each team member clones the repository
echo 2. Switch to their assigned feature branch
echo 3. Start working on assigned tasks
echo 4. Commit with format: [MEMBER] [TYPE]: [DESCRIPTION]
echo 5. Push changes and create Pull Requests to develop branch
echo.
echo 📚 Documentation available:
echo - docs/TEAM_WORKFLOW.md - Detailed workflow guide
echo - docs/SWAGGER.md - API documentation guide
echo - README.md - Project overview
echo.

pause
