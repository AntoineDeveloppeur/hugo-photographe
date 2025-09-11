# Script PowerShell pour construire et demarrer les containers dans le bon ordre
# Usage: .\build-sequence.ps1

Write-Host "Etape 1: Construction de l'image backend..." -ForegroundColor Yellow
docker-compose build backend

Write-Host "Etape 2: Demarrage du container backend..." -ForegroundColor Green
docker-compose up -d backend

Write-Host "Attente que le backend soit operationnel..." -ForegroundColor Cyan
do {
    Write-Host "Backend pas encore pret, attente 5s..." -ForegroundColor Gray
    Start-Sleep -Seconds 5
    try {
        $result = docker-compose exec backend node -e "require('http').get('http://localhost:3002/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" 2>$null
        $backendReady = $LASTEXITCODE -eq 0
    } catch {
        $backendReady = $false
    }
} while (-not $backendReady)

Write-Host "Backend operationnel!" -ForegroundColor Green

Write-Host "Etape 3: Construction de l'image frontend (avec backend disponible)..." -ForegroundColor Yellow
docker-compose build frontend

Write-Host "Etape 4: Demarrage du container frontend..." -ForegroundColor Green
docker-compose up -d frontend

Write-Host "Deploiement termine!" -ForegroundColor Magenta
Write-Host "Frontend: http://localhost:3001" -ForegroundColor Blue
Write-Host "Backend: http://localhost:3002" -ForegroundColor Blue
