#!/bin/bash

# Café Management System - Installation Script
# This script will set up the entire project

set -e

echo "🍔 Café Management System - Setup"
echo "=================================="
echo ""

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14+ first."
    exit 1
fi

echo "✅ Node.js $(node -v) found"
echo ""

# Check npm installation
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm $(npm -v) found"
echo ""

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
echo "✅ Server dependencies installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update server/.env with your configuration"
fi
echo ""

# Go back to root
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
echo "✅ Client dependencies installed"
echo ""

# Go back to root
cd ..

echo "✅ Installation complete!"
echo ""
echo "🚀 To start the development servers:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd server && npm run dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd client && npm start"
echo ""
echo "📖 For more information, see QUICKSTART.md"
