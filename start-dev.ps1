# Hugo Photographe Development Environment Starter
# Simple PowerShell script to launch development servers

Write-Host "Starting Hugo Photographe Development Environment..." -ForegroundColor Green
Write-Host ""

# Get the script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$BackendDir = Join-Path $ScriptDir "backend"

Write-Host "Opening terminals for development servers..." -ForegroundColor Yellow
Write-Host ""

# Start Frontend (Next.js) in new terminal
Write-Host "1. Starting Frontend (Next.js)..." -ForegroundColor Cyan
Start-Process "cmd" -ArgumentList "/k", "cd /d `"$ScriptDir`" && echo Frontend - Next.js && npm run dev" -WindowStyle Normal

# Wait a moment
Start-Sleep -Seconds 1

# Start Backend TypeScript Watch in new terminal  
Write-Host "2. Starting Backend TypeScript Watch..." -ForegroundColor Yellow
Start-Process "cmd" -ArgumentList "/k", "cd /d `"$BackendDir`" && echo Backend - TypeScript Watch && npm run watch" -WindowStyle Normal

# Wait a moment
Start-Sleep -Seconds 1

# Start Backend Dev Server in new terminal
Write-Host "3. Starting Backend Dev Server..." -ForegroundColor Magenta
Start-Process "cmd" -ArgumentList "/k", "cd /d `"$BackendDir`" && echo Backend - Dev Server && npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "All development servers are starting in separate windows..." -ForegroundColor Green
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "- Backend TypeScript: Compiling in watch mode" -ForegroundColor Yellow  
Write-Host "- Backend Server: Check terminal for port" -ForegroundColor Magenta
Write-Host ""
Write-Host "Tip: Close each terminal window to stop the corresponding server" -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to exit this script (servers will continue running)..." -ForegroundColor White
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
