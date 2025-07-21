#!/bin/bash

# Git Workflow Setup Script for Movie Ticket Booking Project
# Repository: https://github.com/Xuanlinh00/movieticket

echo "🚀 Setting up Git workflow for Movie Ticket Booking project..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Please run 'git init' first."
    exit 1
fi

# Set up remote origin if not exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "📡 Adding remote origin..."
    git remote add origin https://github.com/Xuanlinh00/movieticket.git
fi

# Create and switch to develop branch
echo "🌿 Creating develop branch..."
git checkout -b develop 2>/dev/null || git checkout develop

# Create feature branches for each team member
echo "🌿 Creating feature branches..."

# Xuanlinh00 - Team Lead & Backend Core
git checkout -b feature/xuanlinh-auth 2>/dev/null || echo "Branch feature/xuanlinh-auth already exists"
git checkout -b feature/xuanlinh-database 2>/dev/null || echo "Branch feature/xuanlinh-database already exists"
git checkout -b feature/xuanlinh-admin 2>/dev/null || echo "Branch feature/xuanlinh-admin already exists"

# hannechoioi - Frontend Developer
git checkout -b feature/hannechoioi-ui-foundation 2>/dev/null || echo "Branch feature/hannechoioi-ui-foundation already exists"
git checkout -b feature/hannechoioi-movies-ui 2>/dev/null || echo "Branch feature/hannechoioi-movies-ui already exists"
git checkout -b feature/hannechoioi-booking-ui 2>/dev/null || echo "Branch feature/hannechoioi-booking-ui already exists"

# kienthibehaii - Backend Developer
git checkout -b feature/kienthibehaii-server-setup 2>/dev/null || echo "Branch feature/kienthibehaii-server-setup already exists"
git checkout -b feature/kienthibehaii-api-routes 2>/dev/null || echo "Branch feature/kienthibehaii-api-routes already exists"
git checkout -b feature/kienthibehaii-swagger 2>/dev/null || echo "Branch feature/kienthibehaii-swagger already exists"

# Switch back to develop
git checkout develop

# Set up git config for better collaboration
echo "⚙️ Setting up git configuration..."

# Set up commit message template
cat > .gitmessage << 'EOF'
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
EOF

git config commit.template .gitmessage

# Set up useful git aliases
git config alias.co checkout
git config alias.br branch
git config alias.ci commit
git config alias.st status
git config alias.unstage 'reset HEAD --'
git config alias.last 'log -1 HEAD'
git config alias.visual '!gitk'

# Create .gitignore if not exists
if [ ! -f ".gitignore" ]; then
    echo "📝 Creating .gitignore..."
    cat > .gitignore << 'EOF'
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
EOF
fi

echo "✅ Git workflow setup complete!"
echo ""
echo "📋 Next steps for team members:"
echo ""
echo "👤 Xuanlinh00 (Team Lead):"
echo "   git checkout feature/xuanlinh-auth"
echo "   # Work on authentication & security"
echo ""
echo "👤 hannechoioi (Frontend):"
echo "   git checkout feature/hannechoioi-ui-foundation"
echo "   # Work on UI components & frontend"
echo ""
echo "👤 kienthibehaii (Backend):"
echo "   git checkout feature/kienthibehaii-server-setup"
echo "   # Work on server setup & API routes"
echo ""
echo "🔄 Workflow:"
echo "1. Work on your feature branch"
echo "2. Commit with format: [MEMBER] [TYPE]: [DESCRIPTION]"
echo "3. Push to GitHub: git push origin <branch-name>"
echo "4. Create Pull Request to 'develop' branch"
echo "5. Code review & merge"
echo ""
echo "📚 Useful commands:"
echo "   git st                    # Check status"
echo "   git br                    # List branches"
echo "   git co <branch>           # Switch branch"
echo "   git ci -m '[MEMBER] feat: description'  # Commit"
echo ""
echo "🌐 Repository: https://github.com/Xuanlinh00/movieticket"
