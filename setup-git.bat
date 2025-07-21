@echo off
echo 🚀 Setting up Git workflow for Movie Ticket Booking project...

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Not a git repository. Initializing...
    git init
)

REM Add remote origin
echo 📡 Setting up remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/Xuanlinh00/movieticket.git

REM Create develop branch
echo 🌿 Creating develop branch...
git checkout -b develop 2>nul || git checkout develop

REM Create feature branches
echo 🌿 Creating feature branches...

REM Xuanlinh00 branches
git checkout -b feature/xuanlinh-auth 2>nul || echo Branch feature/xuanlinh-auth already exists
git checkout -b feature/xuanlinh-database 2>nul || echo Branch feature/xuanlinh-database already exists  
git checkout -b feature/xuanlinh-admin 2>nul || echo Branch feature/xuanlinh-admin already exists

REM hannechoioi branches
git checkout -b feature/hannechoioi-ui-foundation 2>nul || echo Branch feature/hannechoioi-ui-foundation already exists
git checkout -b feature/hannechoioi-movies-ui 2>nul || echo Branch feature/hannechoioi-movies-ui already exists
git checkout -b feature/hannechoioi-booking-ui 2>nul || echo Branch feature/hannechoioi-booking-ui already exists

REM kienthibehaii branches  
git checkout -b feature/kienthibehaii-server-setup 2>nul || echo Branch feature/kienthibehaii-server-setup already exists
git checkout -b feature/kienthibehaii-api-routes 2>nul || echo Branch feature/kienthibehaii-api-routes already exists
git checkout -b feature/kienthibehaii-swagger 2>nul || echo Branch feature/kienthibehaii-swagger already exists

REM Switch back to develop
git checkout develop

REM Set up git aliases
echo ⚙️ Setting up git configuration...
git config alias.co checkout
git config alias.br branch  
git config alias.ci commit
git config alias.st status
git config alias.unstage "reset HEAD --"
git config alias.last "log -1 HEAD"

echo ✅ Git workflow setup complete!
echo.
echo 📋 Next steps for team members:
echo.
echo 👤 Xuanlinh00 (Team Lead):
echo    git checkout feature/xuanlinh-auth
echo    # Work on authentication ^& security
echo.
echo 👤 hannechoioi (Frontend):
echo    git checkout feature/hannechoioi-ui-foundation  
echo    # Work on UI components ^& frontend
echo.
echo 👤 kienthibehaii (Backend):
echo    git checkout feature/kienthibehaii-server-setup
echo    # Work on server setup ^& API routes
echo.
echo 🔄 Workflow:
echo 1. Work on your feature branch
echo 2. Commit with format: [MEMBER] [TYPE]: [DESCRIPTION]
echo 3. Push to GitHub: git push origin ^<branch-name^>
echo 4. Create Pull Request to 'develop' branch
echo 5. Code review ^& merge
echo.
echo 🌐 Repository: https://github.com/Xuanlinh00/movieticket

pause
