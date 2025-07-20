# Git Workflow Setup Script for Movie Ticket Booking Project
# Repository: https://github.com/Xuanlinh00/movieticket

Write-Host "🚀 Setting up Git workflow for Movie Ticket Booking project..." -ForegroundColor Green

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "❌ Not a git repository. Please run 'git init' first." -ForegroundColor Red
    exit 1
}

# Set up remote origin if not exists
$remoteExists = $false
try {
    git remote get-url origin 2>$null
    $remoteExists = $true
    Write-Host "📡 Remote origin already exists" -ForegroundColor Yellow
} catch {
    $remoteExists = $false
}

if (-not $remoteExists) {
    Write-Host "📡 Adding remote origin..." -ForegroundColor Blue
    git remote add origin https://github.com/Xuanlinh00/movieticket.git
}

# Create and switch to develop branch
Write-Host "🌿 Creating develop branch..." -ForegroundColor Blue
try {
    git checkout -b develop 2>$null
} catch {
    git checkout develop
}

# Create feature branches for each team member
Write-Host "🌿 Creating feature branches..." -ForegroundColor Blue

# Xuanlinh00 - Team Lead & Backend Core
$branches = @(
    "feature/xuanlinh-auth",
    "feature/xuanlinh-database", 
    "feature/xuanlinh-admin",
    "feature/hannechoioi-ui-foundation",
    "feature/hannechoioi-movies-ui",
    "feature/hannechoioi-booking-ui",
    "feature/kienthibehaii-server-setup",
    "feature/kienthibehaii-api-routes",
    "feature/kienthibehaii-swagger"
)

foreach ($branch in $branches) {
    $result = git checkout -b $branch 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Created branch: $branch" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Branch $branch already exists" -ForegroundColor Yellow
        git checkout $branch 2>$null
    }
}

# Switch back to develop
git checkout develop

# Set up git config for better collaboration
Write-Host "⚙️ Setting up git configuration..." -ForegroundColor Blue

# Set up commit message template
$gitmessage = @"
[MEMBER] [TYPE]: [DESCRIPTION]

# Types:
# feat: new feature
# fix: bug fix
# docs: documentation
# style: formatting, missing semi colons, etc
# refactor: code change that neither fixes a bug nor adds a feature
# test: adding tests
# chore: maintain

# Examples:
# [XUANLINH] feat: add JWT authentication middleware
# [HANNECHOIOI] ui: create movie listing component
# [KIENTHIBEHAII] api: implement movies CRUD endpoints
"@

$gitmessage | Out-File -FilePath ".gitmessage" -Encoding UTF8
git config commit.template .gitmessage

# Set up useful git aliases
git config alias.co checkout
git config alias.br branch
git config alias.ci commit
git config alias.st status
git config alias.unstage 'reset HEAD --'
git config alias.last 'log -1 HEAD'

# Create .gitignore if not exists
if (-not (Test-Path ".gitignore")) {
    Write-Host "📝 Creating .gitignore..." -ForegroundColor Blue
    $gitignore = @"
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
.vite/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Docker
.docker/

# Temporary files
*.tmp
*.temp

# Database
*.db
*.sqlite

# Coverage
coverage/
.nyc_output/

# TypeScript
*.tsbuildinfo
"@
    $gitignore | Out-File -FilePath ".gitignore" -Encoding UTF8
}

Write-Host "✅ Git workflow setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps for team members:" -ForegroundColor Cyan
Write-Host ""
Write-Host "👤 Xuanlinh00 (Team Lead):" -ForegroundColor Yellow
Write-Host "   git checkout feature/xuanlinh-auth"
Write-Host "   # Work on authentication & security"
Write-Host ""
Write-Host "👤 hannechoioi (Frontend):" -ForegroundColor Yellow  
Write-Host "   git checkout feature/hannechoioi-ui-foundation"
Write-Host "   # Work on UI components & frontend"
Write-Host ""
Write-Host "👤 kienthibehaii (Backend):" -ForegroundColor Yellow
Write-Host "   git checkout feature/kienthibehaii-server-setup"
Write-Host "   # Work on server setup & API routes"
Write-Host ""
Write-Host "🔄 Workflow:" -ForegroundColor Cyan
Write-Host "1. Work on your feature branch"
Write-Host "2. Commit with format: [MEMBER] [TYPE]: [DESCRIPTION]"
Write-Host "3. Push to GitHub: git push origin <branch-name>"
Write-Host "4. Create Pull Request to 'develop' branch"
Write-Host "5. Code review & merge"
Write-Host ""
Write-Host "📚 Useful commands:" -ForegroundColor Cyan
Write-Host "   git st                    # Check status"
Write-Host "   git br                    # List branches"
Write-Host "   git co <branch>           # Switch branch"
Write-Host "   git ci -m '[MEMBER] feat: description'  # Commit"
Write-Host ""
Write-Host "🌐 Repository: https://github.com/Xuanlinh00/movieticket" -ForegroundColor Blue
