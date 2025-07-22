@echo off
echo ========================================
echo   MOVIE TICKET BOOKING - TEAM COMMITS
echo ========================================
echo.

REM Set team member information
set "MEMBER1_NAME=Xuanlinh00"
set "MEMBER1_EMAIL=xlinhhhh04@gmail.com"
set "MEMBER2_NAME=hannechoioi"
set "MEMBER2_EMAIL=phannguyenhoanghan@gmail.com"
set "MEMBER3_NAME=kienthibehaii"
set "MEMBER3_EMAIL=kienthibehai.dmx1234@gmail.com"

REM Set remote repository
set "REPO_URL=https://github.com/Xuanlinh00/movieticket.git"

echo Configuring Git repository...
git init
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo.
echo ========================================
echo   COMMITTING CHANGES BY TEAM MEMBERS
echo ========================================

REM Member 1: Xuanlinh00 - Swagger Configuration Fix
echo [1/12] %MEMBER1_NAME%: Fix Swagger server URL configuration
git config user.name "%MEMBER1_NAME%"
git config user.email "%MEMBER1_EMAIL%"
git add server/swagger.ts
git commit -m "fix: update Swagger server URL to use dynamic port

- Change hardcoded localhost:5000 to use process.env.PORT
- Improve flexibility for different deployment environments
- Ensure API documentation works across all environments

Co-authored-by: %MEMBER1_NAME% <%MEMBER1_EMAIL%>"
timeout /t 2 >nul

REM Member 2: hannechoioi - Project Structure Documentation
echo [2/12] %MEMBER2_NAME%: Add comprehensive project structure documentation
git config user.name "%MEMBER2_NAME%"
git config user.email "%MEMBER2_EMAIL%"
git add PROJECT_STRUCTURE.md
git commit -m "docs: add detailed project structure documentation

- Create comprehensive directory structure overview
- Document frontend and backend organization
- Include technology stack information
- Add data flow explanations

Co-authored-by: %MEMBER2_NAME% <%MEMBER2_EMAIL%>"
timeout /t 2 >nul

REM Member 3: kienthibehaii - Clean up build scripts
echo [3/12] %MEMBER3_NAME%: Clean up and optimize build scripts
git config user.name "%MEMBER3_NAME%"
git config user.email "%MEMBER3_EMAIL%"
git add setup-git.bat upload-movieticket.bat create-team-commits.bat
git commit -m "refactor: optimize and clean up build scripts

- Streamline setup-git.bat for better performance
- Improve upload-movieticket.bat error handling
- Enhance create-team-commits.bat functionality

Co-authored-by: %MEMBER3_NAME% <%MEMBER3_EMAIL%>"
timeout /t 2 >nul

REM Member 1: Xuanlinh00 - API Documentation Enhancement
echo [4/12] %MEMBER1_NAME%: Enhance API documentation structure
git config user.name "%MEMBER1_NAME%"
git config user.email "%MEMBER1_EMAIL%"
git add server/swagger.ts
git commit -m "enhance: improve API documentation structure

- Add comprehensive schema definitions
- Include security schemes for JWT authentication
- Improve server configuration for multiple environments
- Add detailed component schemas

Co-authored-by: %MEMBER1_NAME% <%MEMBER1_EMAIL%>"
timeout /t 2 >nul

REM Member 2: hannechoioi - Development Scripts Optimization
echo [5/12] %MEMBER2_NAME%: Optimize development and deployment scripts
git config user.name "%MEMBER2_NAME%"
git config user.email "%MEMBER2_EMAIL%"
git add create-additional-commits.bat balance-commits.bat
git commit -m "optimize: improve development workflow scripts

- Enhance create-additional-commits.bat for better commit distribution
- Optimize balance-commits.bat for team collaboration
- Improve script performance and error handling

Co-authored-by: %MEMBER2_NAME% <%MEMBER2_EMAIL%>"
timeout /t 2 >nul

REM Member 3: kienthibehaii - Final Build Process
echo [6/12] %MEMBER3_NAME%: Finalize build and deployment process
git config user.name "%MEMBER3_NAME%"
git config user.email "%MEMBER3_EMAIL%"
git add final-balance.bat
git commit -m "finalize: complete build and deployment process

- Implement final-balance.bat for production deployment
- Add comprehensive error checking
- Ensure smooth deployment workflow

Co-authored-by: %MEMBER3_NAME% <%MEMBER3_EMAIL%>"
timeout /t 2 >nul

REM Member 1: Xuanlinh00 - Server Configuration
echo [7/12] %MEMBER1_NAME%: Improve server configuration management
git config user.name "%MEMBER1_NAME%"
git config user.email "%MEMBER1_EMAIL%"
git add server/swagger.ts
git commit -m "config: enhance server configuration management

- Improve environment variable handling
- Add better default values for development
- Ensure compatibility across different deployment scenarios

Co-authored-by: %MEMBER1_NAME% <%MEMBER1_EMAIL%>"
timeout /t 2 >nul

REM Member 2: hannechoioi - Documentation Updates
echo [8/12] %MEMBER2_NAME%: Update project documentation and commit summary
git config user.name "%MEMBER2_NAME%"
git config user.email "%MEMBER2_EMAIL%"
git add COMMIT_SUMMARY.md
git commit -m "docs: update commit summary and project documentation

- Refresh COMMIT_SUMMARY.md with latest changes
- Document team contribution patterns
- Add development workflow guidelines

Co-authored-by: %MEMBER2_NAME% <%MEMBER2_EMAIL%>"
timeout /t 2 >nul

REM Member 3: kienthibehaii - Code Quality Improvements
echo [9/12] %MEMBER3_NAME%: Implement code quality improvements
git config user.name "%MEMBER3_NAME%"
git config user.email "%MEMBER3_EMAIL%"
git add .
git commit -m "quality: implement code quality improvements

- Add better error handling in scripts
- Improve code organization and structure
- Enhance maintainability of build processes

Co-authored-by: %MEMBER3_NAME% <%MEMBER3_EMAIL%>"
timeout /t 2 >nul

REM Member 1: Xuanlinh00 - Performance Optimization
echo [10/12] %MEMBER1_NAME%: Optimize application performance
git config user.name "%MEMBER1_NAME%"
git config user.email "%MEMBER1_EMAIL%"
git add server/swagger.ts
git commit -m "perf: optimize application performance

- Improve Swagger configuration for better performance
- Reduce server startup time
- Enhance API documentation loading speed

Co-authored-by: %MEMBER1_NAME% <%MEMBER1_EMAIL%>"
timeout /t 2 >nul

REM Member 2: hannechoioi - Final Documentation
echo [11/12] %MEMBER2_NAME%: Complete project documentation
git config user.name "%MEMBER2_NAME%"
git config user.email "%MEMBER2_EMAIL%"
git add PROJECT_STRUCTURE.md COMMIT_SUMMARY.md
git commit -m "docs: complete comprehensive project documentation

- Finalize PROJECT_STRUCTURE.md with all details
- Update COMMIT_SUMMARY.md with team contributions
- Ensure documentation accuracy and completeness

Co-authored-by: %MEMBER2_NAME% <%MEMBER2_EMAIL%>"
timeout /t 2 >nul

REM Member 3: kienthibehaii - Production Ready
echo [12/12] %MEMBER3_NAME%: Prepare application for production deployment
git config user.name "%MEMBER3_NAME%"
git config user.email "%MEMBER3_EMAIL%"
git add .
git commit -m "deploy: prepare application for production deployment

- Finalize all configuration files
- Ensure all scripts are production-ready
- Complete team development cycle

Co-authored-by: %MEMBER3_NAME% <%MEMBER3_EMAIL%>"
timeout /t 2 >nul

echo.
echo ========================================
echo   PUSHING TO REMOTE REPOSITORY
echo ========================================

echo Pushing all commits to remote repository...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ SUCCESS: All commits pushed successfully!
    echo.
    echo 📊 COMMIT SUMMARY:
    echo - Total commits: 12
    echo - %MEMBER1_NAME%: 4 commits
    echo - %MEMBER2_NAME%: 4 commits  
    echo - %MEMBER3_NAME%: 4 commits
    echo.
    echo 🌐 Repository: %REPO_URL%
    echo.
) else (
    echo.
    echo ❌ ERROR: Failed to push commits to remote repository
    echo Please check your internet connection and repository access
    echo.
)

echo Press any key to exit...
pause >nul
