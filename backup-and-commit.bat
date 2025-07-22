@echo off
echo ========================================
echo   BACKUP AND TEAM COMMIT SYSTEM
echo ========================================
echo.

REM Create backup directory with timestamp
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "datestamp=%YYYY%%MM%%DD%_%HH%%Min%%Sec%"

set "BACKUP_DIR=backup_%datestamp%"

echo 💾 Creating backup: %BACKUP_DIR%
mkdir "%BACKUP_DIR%" 2>nul

REM Backup important files
echo Backing up current state...
copy "server\swagger.ts" "%BACKUP_DIR%\swagger.ts.bak" >nul 2>&1
copy "PROJECT_STRUCTURE.md" "%BACKUP_DIR%\PROJECT_STRUCTURE.md.bak" >nul 2>&1
copy "COMMIT_SUMMARY.md" "%BACKUP_DIR%\COMMIT_SUMMARY.md.bak" >nul 2>&1
copy "*.bat" "%BACKUP_DIR%\" >nul 2>&1

echo ✅ Backup created successfully in %BACKUP_DIR%
echo.

REM Check Git status
echo 🔍 Checking Git status...
git status --porcelain > git_status.tmp
for /f %%i in ("git_status.tmp") do set size=%%~zi
del git_status.tmp

if %size% gtr 0 (
    echo 📝 Changes detected, proceeding with commits...
    echo.
    
    REM Execute team commits
    call team-commits.bat
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ✅ SUCCESS: All commits completed successfully!
        echo 📁 Backup available at: %BACKUP_DIR%
        echo.
        
        REM Show final status
        echo 📊 FINAL REPOSITORY STATUS:
        git log --oneline -10
        echo.
        
        echo 🌐 Repository URL: https://github.com/Xuanlinh00/movieticket
        echo.
        
        REM Ask if backup should be kept
        set /p "KEEP_BACKUP=Keep backup folder? (y/n): "
        if /i "%KEEP_BACKUP%"=="n" (
            rmdir /s /q "%BACKUP_DIR%"
            echo 🗑️  Backup folder removed
        ) else (
            echo 💾 Backup folder preserved: %BACKUP_DIR%
        )
    ) else (
        echo.
        echo ❌ ERROR: Commit process failed!
        echo 🔄 Restoring from backup...
        
        REM Restore from backup
        copy "%BACKUP_DIR%\swagger.ts.bak" "server\swagger.ts" >nul 2>&1
        copy "%BACKUP_DIR%\PROJECT_STRUCTURE.md.bak" "PROJECT_STRUCTURE.md" >nul 2>&1
        copy "%BACKUP_DIR%\COMMIT_SUMMARY.md.bak" "COMMIT_SUMMARY.md" >nul 2>&1
        
        echo ✅ Files restored from backup
        echo 📁 Backup preserved at: %BACKUP_DIR%
    )
) else (
    echo ℹ️  No changes detected, skipping commit process
    rmdir /s /q "%BACKUP_DIR%"
    echo 🗑️  Empty backup folder removed
)

echo.
echo ========================================
echo   PROCESS COMPLETED
echo ========================================
echo.
pause
