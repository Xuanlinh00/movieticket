@echo off
echo ========================================
echo   KIEN THI COMMIT SCRIPTS - DEVOPS
echo ========================================
echo.

:menu
echo Choose your commit:
echo.
echo === PHASE 1: INFRASTRUCTURE SETUP ===
echo 1. Docker setup
echo 2. Database initialization
echo 3. Development tools
echo 4. Configuration files
echo.
echo === PHASE 2: INFRASTRUCTURE ===
echo 5. Nginx configuration
echo 6. Performance monitoring
echo.
echo === PHASE 3: FINAL POLISH ===
echo 7. Documentation
echo 8. SSL and security
echo 9. Final optimizations
echo 10. Project completion
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
echo === COMMIT 1: Docker setup ===
git add Dockerfile docker-compose.yml Dockerfile.dev docker-compose.dev.yml
git commit -m "feat: add Docker containerization for development and production

- Create multi-stage Dockerfile for optimized builds
- Setup Docker Compose for development environment
- Add production Docker configuration
- Configure container networking and volumes
- Setup health checks for all services

Author: Kiên Thị <kienthibehai.dmx1234@gmail.com>"
echo Commit 1 completed!
goto menu

:commit2
echo.
echo === COMMIT 2: Database initialization ===
git add mongo-init.js debug-mongo.js
git commit -m "feat: setup MongoDB initialization and seeding scripts

- Create MongoDB initialization script
- Add sample data seeding for development
- Setup database indexes for performance
- Create debug utilities for database operations
- Configure database user permissions

Author: Kiên Thị <kienthibehai.dmx1234@gmail.com>"
echo Commit 2 completed!
goto menu

:commit3
echo.
echo === COMMIT 3: Development tools ===
git add start-dev.bat stop-dev.bat kill-port.bat docker-scripts.sh
git commit -m "feat: add development automation scripts and tools

- Create Windows batch scripts for development
- Add port management utilities
- Setup Docker automation scripts
- Create cross-platform development tools
- Add process management utilities

Author: Kiên Thị <kienthibehai.dmx1234@gmail.com>"
echo Commit 3 completed!
goto menu

:commit4
echo.
echo === COMMIT 4: Configuration files ===
git add tsconfig.json vite.config.ts postcss.config.js drizzle.config.ts
git commit -m "feat: configure TypeScript, Vite, and build tools

- Setup TypeScript configuration for full-stack
- Configure Vite for optimal development and builds
- Setup PostCSS for CSS processing
- Configure Drizzle ORM for database operations
- Add path aliases and module resolution

Author: Kiên Thị <kienthibehai.dmx1234@gmail.com>"
echo Commit 4 completed!
goto menu

:commit5
echo.
echo === COMMIT 5: Nginx configuration ===
git add nginx.conf
git commit -m "feat: add Nginx reverse proxy configuration

- Setup Nginx as reverse proxy
- Configure load balancing for scalability
- Add SSL/TLS configuration
- Setup static file serving optimization
- Configure rate limiting and security headers

Author: Kiên Thị <kienthibehai.dmx1234@gmail.com>"
echo Commit 5 completed!
goto menu

:commit6
echo.
echo === COMMIT 6: Performance monitoring ===
git add performance/ logs/
git commit -m "feat: setup performance monitoring and logging system

- Create performance testing configuration
- Setup application logging system
- Add monitoring dashboards
- Configure log rotation and management
- Setup performance metrics collection

Author: Kiên Thị <kienthibehai.dmx1234@gmail.com>"
echo Commit 6 completed!
goto menu

:commit7
echo.
echo === COMMIT 7: Documentation ===
git add README.md SETUP_GUIDE.md DOCKER_GUIDE.md MANUAL_RUN_GUIDE.md SCRIPTS_README.md
git commit -m "docs: comprehensive project documentation and guides

- Create detailed README with project overview
- Add step-by-step setup guide
- Create Docker deployment documentation
- Add manual installation guide
- Document all scripts and automation tools

Author: Kiên Thị <kienthibehai.dmx1234@gmail.com>"
echo Commit 7 completed!
goto menu

:commit8
echo.
echo === COMMIT 8: SSL and security ===
git add ssl/ nginx.conf
git commit -m "feat: add SSL configuration and security enhancements

- Setup SSL certificate configuration
- Add security headers and HTTPS redirect
- Configure secure cookie settings
- Setup CORS and security middleware
- Add environment-based security configs

Author: Kiên Thị <kienthibehai.dmx1234@gmail.com>"
echo Commit 8 completed!
goto menu

:commit9
echo.
echo === COMMIT 9: Final optimizations ===
git add package.json .gitignore jest.config.js
git commit -m "feat: final optimizations and production readiness

- Optimize package.json dependencies
- Create comprehensive .gitignore
- Setup testing configuration
- Add production build optimizations
- Configure environment variables

Author: Kiên Thị <kienthibehai.dmx1234@gmail.com>"
echo Commit 9 completed!
goto menu

:commit10
echo.
echo === COMMIT 10: Project completion ===
git add TEAM_COMMIT_PLAN.md swagger-test-examples.md install-swagger.bat
git commit -m "docs: finalize project with team documentation and examples

- Add team collaboration documentation
- Create API testing examples
- Add installation automation scripts
- Document commit strategy and workflow
- Complete project documentation suite

Author: Kiên Thị <kienthibehai.dmx1234@gmail.com>"
echo Commit 10 completed!
goto menu

:end
echo.
echo All commits completed! Outstanding work, Kiên Thị! ⚙️
echo.
pause
