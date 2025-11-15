@echo off
REM Café Management System - Installation Script for Windows

echo.
echo 🍔 Café Management System - Setup
echo ==================================
echo.

REM Check Node.js installation
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 14+ first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% found
echo.

REM Check npm installation
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✅ npm %NPM_VERSION% found
echo.

REM Install server dependencies
echo 📦 Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install server dependencies
    pause
    exit /b 1
)
echo ✅ Server dependencies installed
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ⚠️  Please update server/.env with your configuration
)
echo.

REM Go back to root
cd ..

REM Install client dependencies
echo 📦 Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install client dependencies
    pause
    exit /b 1
)
echo ✅ Client dependencies installed
echo.

REM Go back to root
cd ..

echo ✅ Installation complete!
echo.
echo 🚀 To start the development servers:
echo.
echo Terminal 1 - Backend:
echo   cd server ^&^& npm run dev
echo.
echo Terminal 2 - Frontend:
echo   cd client ^&^& npm start
echo.
echo 📖 For more information, see QUICKSTART.md
echo.
pause
