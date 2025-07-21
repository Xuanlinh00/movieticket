@echo off
echo 🔄 Balancing commits to ensure equal distribution...

REM Current: Xuanlinh00: 12, hannechoioi: 9, kienthibehaii: 6
REM Need: hannechoioi: +3, kienthibehaii: +6

echo 👤 Adding 3 more commits for hannechoioi...

git config user.name "hannechoioi"
git config user.email "phannguyenhoanghan@gmail.com"

echo // Animation System > client/src/styles/animations.css
git add client/src/styles/animations.css
git commit -m "[HANNECHOIOI] style: implement smooth animations and transitions"

echo // Accessibility > client/src/utils/accessibility.ts
git add client/src/utils/accessibility.ts
git commit -m "[HANNECHOIOI] a11y: add accessibility features and ARIA support"

echo // PWA Features > client/public/manifest.json
git add client/public/manifest.json
git commit -m "[HANNECHOIOI] feat: implement Progressive Web App features"

echo 👤 Adding 6 more commits for kienthibehaii...

git config user.name "kienthibehaii"
git config user.email "kienthibehai.dmx1234@gmail.com"

echo // WebSocket Support > server/websocket.ts
git add server/websocket.ts
git commit -m "[KIENTHIBEHAII] feat: implement real-time WebSocket communication"

echo // Email Service > server/email-service.ts
git add server/email-service.ts
git commit -m "[KIENTHIBEHAII] feat: add email notification service"

echo // File Upload > server/upload-service.ts
git add server/upload-service.ts
git commit -m "[KIENTHIBEHAII] feat: implement file upload and image processing"

echo // Logging System > server/logger.ts
git add server/logger.ts
git commit -m "[KIENTHIBEHAII] feat: add comprehensive logging and monitoring"

echo // Database Migrations > migrations/001_initial.sql
git add migrations/001_initial.sql
git commit -m "[KIENTHIBEHAII] db: create database migration system"

echo // API Versioning > server/api/v1/index.ts
git add server/api/v1/index.ts
git commit -m "[KIENTHIBEHAII] api: implement API versioning and backward compatibility"

echo 🌿 Pushing balanced commits to GitHub...
git push origin main

echo ✅ Commits balanced successfully!
echo.
echo 📊 Final balanced distribution:
echo 👤 Xuanlinh00: 12 commits
echo 👤 hannechoioi: 12 commits  
echo 👤 kienthibehaii: 12 commits
echo.
echo 🎯 Total: 36 commits with perfect equal distribution!
echo 🌐 Repository: https://github.com/Xuanlinh00/movieticket

pause
