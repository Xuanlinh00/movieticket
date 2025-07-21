@echo off
echo ========================================
echo    Installing Swagger Dependencies
echo ========================================
echo.

echo Installing swagger-jsdoc and swagger-ui-express...
npm install swagger-jsdoc@^6.2.8 swagger-ui-express@^5.0.1

echo.
echo Installing TypeScript definitions...
npm install --save-dev @types/swagger-jsdoc@^6.0.4 @types/swagger-ui-express@^4.1.6

echo.
echo ========================================
echo    Swagger Installation Complete!
echo ========================================
echo.
echo Swagger UI will be available at:
echo http://localhost:5000/api-docs
echo.
echo To start the server:
echo npm run dev
echo.
pause
