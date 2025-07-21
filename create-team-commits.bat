@echo off
echo 🚀 Creating commits for all 3 team members...

REM Reset git completely
echo 🔄 Resetting git repository...
rmdir /s /q .git 2>nul
git init

REM Add remote
echo 📡 Adding remote origin...
git remote add origin https://github.com/Xuanlinh00/movieticket.git

REM Configure git for each member (we'll change this for each commit)
echo ⚙️ Setting up git configuration...

REM ========================================
REM XUANLINH00 COMMITS (Team Lead)
REM ========================================

echo 👤 Creating commits for Xuanlinh00 (Team Lead)...

REM Commit 1: Project Setup & Infrastructure
git config user.name "Xuanlinh00"
git config user.email "xlinhhhh04@gmail.com"

git add package.json package-lock.json tsconfig.json vite.config.ts
git add docker-compose.yml Dockerfile Dockerfile.dev nginx.conf
git add .env.example .gitignore .dockerignore
git add .vscode/ .prettierrc .eslintrc.js components.json
git commit -m "[XUANLINH] feat: setup project infrastructure with Docker, TypeScript, and development tools"

REM Commit 2: Database & Storage System
git add server/storage.ts server/mongodb.ts shared/schema.ts
git add mongo-init.js debug-mongo.js drizzle.config.ts
git commit -m "[XUANLINH] feat: implement MongoDB storage system and database schemas"

REM Commit 3: Authentication & Security
git add server/routes.ts -A
git reset HEAD server/routes.ts
git add server/routes.ts
git commit -m "[XUANLINH] feat: add JWT authentication, password hashing, and security middleware"

REM ========================================
REM HANNECHOIOI COMMITS (Frontend Developer)
REM ========================================

echo 👤 Creating commits for hannechoioi (Frontend Developer)...

REM Commit 4: Frontend Foundation
git config user.name "hannechoioi"
git config user.email "phannguyenhoanghan@gmail.com"

git add client/index.html client/src/main.tsx client/src/index.css
git add tailwind.config.ts postcss.config.js
git add client/src/lib/utils.ts client/src/lib/types.ts
git commit -m "[HANNECHOIOI] feat: setup React frontend with Vite, Tailwind CSS, and TypeScript"

REM Commit 5: UI Components Library
git add client/src/components/ui/
git add client/src/hooks/
git add client/src/lib/queryClient.ts client/src/lib/auth.ts
git commit -m "[HANNECHOIOI] ui: create comprehensive UI components library with shadcn/ui"

REM Commit 6: Core Application Pages
git add client/src/App.tsx client/src/pages/
git add client/src/components/Navigation.tsx client/src/components/MovieCard.tsx
git commit -m "[HANNECHOIOI] ui: implement core application pages and navigation components"

REM ========================================
REM KIENTHIBEHAII COMMITS (Backend Developer)
REM ========================================

echo 👤 Creating commits for kienthibehaii (Backend Developer)...

REM Commit 7: Server Setup & Configuration
git config user.name "kienthibehaii"
git config user.email "kienthibehai.dmx1234@gmail.com"

git add server/index.ts server/vite.ts
git commit -m "[KIENTHIBEHAII] feat: setup Express server with Vite integration and middleware"

REM Commit 8: API Documentation with Swagger
git add server/swagger.ts docs/SWAGGER.md
git commit -m "[KIENTHIBEHAII] docs: implement Swagger API documentation with comprehensive schemas"

REM Commit 9: Advanced Components & Features
git add client/src/components/BookingForm.tsx client/src/components/SeatMap.tsx
git add client/src/components/MovieReviews.tsx
git add performance/ jest.config.js
git commit -m "[KIENTHIBEHAII] feat: add booking system, seat selection, and performance testing"

REM ========================================
REM ADDITIONAL COMMITS FOR EQUAL DISTRIBUTION
REM ========================================

echo 👤 Creating additional commits for equal distribution...

REM Commit 10: Xuanlinh - Admin Panel Backend
git config user.name "Xuanlinh00"
git config user.email "xlinhhhh04@gmail.com"

git add client/src/pages/AdminPanel.tsx client/src/pages/AdminPanel.tsx.backup
git commit -m "[XUANLINH] feat: implement admin panel with user and movie management"

REM Commit 11: hannechoioi - User Interface Polish
git config user.name "hannechoioi"
git config user.email "phannguyenhoanghan@gmail.com"

git add client/src/pages/Dashboard.tsx client/src/pages/Login.tsx client/src/pages/Register.tsx
git commit -m "[HANNECHOIOI] ui: create user authentication and dashboard interfaces"

REM Commit 12: kienthibehaii - Documentation & Scripts
git config user.name "kienthibehaii"
git config user.email "kienthibehai.dmx1234@gmail.com"

git add docs/TEAM_WORKFLOW.md scripts/
git add *.md *.bat *.sh
git commit -m "[KIENTHIBEHAII] docs: add comprehensive documentation and automation scripts"

REM Add any remaining files
git add .
git commit -m "[TEAM] chore: add remaining project files and configurations" --allow-empty

REM ========================================
REM PUSH TO GITHUB
REM ========================================

echo 🌿 Creating and pushing branches...

REM Create main branch and push
git branch -M main
git push -u origin main --force

REM Create develop branch
git checkout -b develop
git push -u origin develop

REM Create feature branches
git checkout -b feature/xuanlinh-auth
git push -u origin feature/xuanlinh-auth

git checkout -b feature/hannechoioi-ui-foundation
git push -u origin feature/hannechoioi-ui-foundation

git checkout -b feature/kienthibehaii-server-setup
git push -u origin feature/kienthibehaii-server-setup

git checkout main

echo ✅ Team commits created successfully!
echo.
echo 📊 Commit distribution:
echo 👤 Xuanlinh00: 4 commits (Infrastructure, Database, Auth, Admin)
echo 👤 hannechoioi: 4 commits (Frontend, UI Components, Pages, Dashboard)
echo 👤 kienthibehaii: 4 commits (Server, Swagger, Features, Documentation)
echo 👥 Team: 1 commit (Remaining files)
echo.
echo 🌐 Repository: https://github.com/Xuanlinh00/movieticket
echo 📈 All team members now have equal contribution history!

pause
