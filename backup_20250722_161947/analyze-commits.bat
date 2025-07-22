@echo off
echo ========================================
echo   COMMIT ANALYSIS - TEAM CONTRIBUTIONS
echo ========================================
echo.

REM Team member information
set "MEMBER1_NAME=Xuanlinh00"
set "MEMBER1_EMAIL=xlinhhhh04@gmail.com"
set "MEMBER2_NAME=hannechoioi"
set "MEMBER2_EMAIL=phannguyenhoanghan@gmail.com"
set "MEMBER3_NAME=kienthibehaii"
set "MEMBER3_EMAIL=kienthibehai.dmx1234@gmail.com"

echo 📊 PLANNED COMMIT DISTRIBUTION:
echo.
echo 👤 %MEMBER1_NAME% (%MEMBER1_EMAIL%):
echo    [1] Fix Swagger server URL configuration
echo    [4] Enhance API documentation structure  
echo    [7] Improve server configuration management
echo    [10] Optimize application performance
echo    Total: 4 commits
echo.
echo 👤 %MEMBER2_NAME% (%MEMBER2_EMAIL%):
echo    [2] Add comprehensive project structure documentation
echo    [5] Optimize development and deployment scripts
echo    [8] Update project documentation and commit summary
echo    [11] Complete project documentation
echo    Total: 4 commits
echo.
echo 👤 %MEMBER3_NAME% (%MEMBER3_EMAIL%):
echo    [3] Clean up and optimize build scripts
echo    [6] Finalize build and deployment process
echo    [9] Implement code quality improvements
echo    [12] Prepare application for production deployment
echo    Total: 4 commits
echo.
echo ========================================
echo   COMMIT DETAILS
echo ========================================
echo.
echo 🔧 TECHNICAL CHANGES:
echo - Swagger configuration improvements
echo - Dynamic port configuration
echo - Build script optimization
echo - Documentation enhancements
echo - Code quality improvements
echo - Production deployment preparation
echo.
echo 📁 FILES AFFECTED:
echo - server/swagger.ts (Swagger configuration)
echo - PROJECT_STRUCTURE.md (Project documentation)
echo - *.bat files (Build and deployment scripts)
echo - COMMIT_SUMMARY.md (Team contribution summary)
echo.
echo 🎯 COMMIT STRATEGY:
echo - Equal distribution: 4 commits per member
echo - Logical grouping by expertise area
echo - Progressive development workflow
echo - Professional commit messages
echo - Co-authored attribution
echo.
echo ⚡ EXECUTION PLAN:
echo 1. Initialize Git repository
echo 2. Configure remote origin
echo 3. Execute 12 commits in sequence
echo 4. Push all commits to GitHub
echo 5. Verify equal contribution
echo.
echo 🌐 Target Repository: https://github.com/Xuanlinh00/movieticket
echo.
echo Press any key to continue with commit execution...
pause >nul

echo.
echo ========================================
echo   EXECUTING TEAM COMMITS
echo ========================================
echo.

call team-commits.bat

echo.
echo ========================================
echo   POST-COMMIT ANALYSIS
echo ========================================
echo.

echo Analyzing commit history...
git log --oneline --author="%MEMBER1_EMAIL%" | find /c /v "" > temp1.txt
set /p MEMBER1_COUNT=<temp1.txt
del temp1.txt

git log --oneline --author="%MEMBER2_EMAIL%" | find /c /v "" > temp2.txt
set /p MEMBER2_COUNT=<temp2.txt
del temp2.txt

git log --oneline --author="%MEMBER3_EMAIL%" | find /c /v "" > temp3.txt
set /p MEMBER3_COUNT=<temp3.txt
del temp3.txt

echo.
echo 📈 ACTUAL COMMIT COUNTS:
echo - %MEMBER1_NAME%: %MEMBER1_COUNT% commits
echo - %MEMBER2_NAME%: %MEMBER2_COUNT% commits
echo - %MEMBER3_NAME%: %MEMBER3_COUNT% commits
echo.

if %MEMBER1_COUNT%==%MEMBER2_COUNT% if %MEMBER2_COUNT%==%MEMBER3_COUNT% (
    echo ✅ SUCCESS: Equal distribution achieved!
) else (
    echo ⚠️  WARNING: Unequal distribution detected
)

echo.
echo 🎉 Team commit process completed!
echo Check GitHub repository for results.
echo.
pause
