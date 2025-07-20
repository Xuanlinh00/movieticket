# 🚀 GitHub Workflow Guide - NaCinema Team

## 📋 Tổng quan

Hướng dẫn này giúp 3 thành viên team làm việc hiệu quả với GitHub repository: https://github.com/Xuanlinh00/movieticket

---

## 👥 Team Members & Roles

| Thành viên | GitHub | Email | Chuyên trách |
|------------|--------|-------|--------------|
| **Xuân Linh** | Xuanlinh00 | xlinhhhh04@gmail.com | Backend & API |
| **Hoàng Hân** | hannechoioi | phannguyenhoanghan@gmail.com | Frontend & UI |
| **Kiên Thị** | kienthibehaii | kienthibehai.dmx1234@gmail.com | DevOps & Infrastructure |

---

## 🔧 Setup Ban Đầu

### 1. Repository Owner (Xuân Linh)

```bash
# Chạy script setup tự động
./setup-github-repo.bat

# Hoặc setup thủ công:
git init
git remote add origin https://github.com/Xuanlinh00/movieticket.git
git add .
git commit -m "feat: initial project setup"
git push -u origin main
```

### 2. Add Collaborators

1. Vào: https://github.com/Xuanlinh00/movieticket/settings/access
2. Click **"Add people"**
3. Thêm:
   - `hannechoioi` (Hoàng Hân)
   - `kienthibehaii` (Kiên Thị)
4. Set role: **"Write"** (có quyền push)

### 3. Team Members Clone Repository

```bash
# Hoàng Hân và Kiên Thị
git clone https://github.com/Xuanlinh00/movieticket.git
cd movieticket

# Setup user info
git config user.name "Your Name"
git config user.email "your.email@gmail.com"
```

---

## 📝 Commit Workflow

### Mỗi thành viên có script riêng:

**Xuân Linh (Backend):**
```bash
./commit-scripts/xuanlinh-commits.bat
```

**Hoàng Hân (Frontend):**
```bash
./commit-scripts/hoanghan-commits.bat
```

**Kiên Thị (DevOps):**
```bash
./commit-scripts/kienthi-commits.bat
```

### Quy trình commit chuẩn:

1. **Pull latest changes:**
   ```bash
   git pull origin main
   ```

2. **Make your changes** theo phân công

3. **Run commit script** của bạn

4. **Push to GitHub:**
   ```bash
   git push origin main
   ```

---

## 🌿 Branch Strategy

### Main Branches:
- **`main`**: Production-ready code
- **`develop`**: Integration branch (optional)

### Feature Branches (mỗi người):

**Xuân Linh:**
- `feature/backend-foundation`
- `feature/api-development`
- `feature/advanced-backend`

**Hoàng Hân:**
- `feature/frontend-foundation`
- `feature/ui-components`
- `feature/user-interface`

**Kiên Thị:**
- `feature/docker-setup`
- `feature/infrastructure`
- `feature/documentation`

### Workflow với branches:

```bash
# Tạo và switch sang feature branch
git checkout -b feature/your-feature

# Làm việc và commit
git add .
git commit -m "feat: your feature description"

# Push feature branch
git push origin feature/your-feature

# Tạo Pull Request trên GitHub
# Sau khi review và approve, merge vào main
```

---

## 📅 Commit Schedule

### Tuần 1: Foundation (10 commits)
- **Thứ 2**: Xuân Linh (2 commits)
- **Thứ 3**: Hoàng Hân (2 commits)
- **Thứ 4**: Kiên Thị (2 commits)
- **Thứ 5**: Xuân Linh (1 commit)
- **Thứ 6**: Hoàng Hân (1 commit)
- **Thứ 7**: Kiên Thị (2 commits)

### Tuần 2: Core Features (10 commits)
- **Thứ 2**: Xuân Linh (2 commits)
- **Thứ 3**: Hoàng Hân (2 commits)
- **Thứ 4**: Kiên Thị (1 commit)
- **Thứ 5**: Xuân Linh (2 commits)
- **Thứ 6**: Hoàng Hân (2 commits)
- **Thứ 7**: Kiên Thị (1 commit)

### Tuần 3: Polish & Deploy (10 commits)
- **Thứ 2**: Xuân Linh (2 commits)
- **Thứ 3**: Hoàng Hân (2 commits)
- **Thứ 4**: Kiên Thị (1 commit)
- **Thứ 5**: Xuân Linh (2 commits)
- **Thứ 6**: Hoàng Hân (1 commit)
- **Thứ 7**: Kiên Thị (2 commits)

---

## 🔄 Daily Workflow

### Morning Routine:
```bash
# 1. Pull latest changes
git pull origin main

# 2. Check what you need to work on today
# (Check TEAM_COMMIT_PLAN.md)

# 3. Start working on your assigned tasks
```

### Evening Routine:
```bash
# 1. Run your commit script
./commit-scripts/your-name-commits.bat

# 2. Push changes
git push origin main

# 3. Update team on progress (Discord/Slack)
```

---

## 🚨 Conflict Resolution

### Khi có merge conflicts:

1. **Pull latest changes:**
   ```bash
   git pull origin main
   ```

2. **Resolve conflicts** trong code editor

3. **Add resolved files:**
   ```bash
   git add .
   ```

4. **Complete merge:**
   ```bash
   git commit -m "fix: resolve merge conflicts"
   ```

5. **Push:**
   ```bash
   git push origin main
   ```

---

## 📊 Progress Tracking

### GitHub Issues (Optional):
- Tạo issues cho major features
- Assign issues cho từng thành viên
- Close issues khi complete

### GitHub Projects (Optional):
- Tạo project board
- Track progress với Kanban board
- Move cards: To Do → In Progress → Done

### Commit Statistics:
```bash
# Xem commit history
git log --oneline --graph

# Xem contributions của từng người
git shortlog -sn

# Xem changes trong commit
git show <commit-hash>
```

---

## 🎯 Best Practices

### Commit Messages:
```bash
# Good examples:
feat(auth): implement JWT authentication system
fix(booking): resolve seat selection validation issue
docs(api): add Swagger documentation for movies endpoint
style(ui): improve responsive design for mobile devices

# Bad examples:
"update code"
"fix bug"
"changes"
```

### Code Review:
- Review code của nhau trước khi merge
- Comment constructively
- Test changes locally before approve

### Communication:
- Update team về progress hàng ngày
- Thông báo khi có breaking changes
- Ask for help khi stuck

---

## 🔧 Useful Git Commands

```bash
# Xem status
git status

# Xem changes
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo changes in file
git checkout -- filename

# View commit history
git log --oneline -10

# Create and switch branch
git checkout -b new-branch

# Switch branch
git checkout branch-name

# Delete branch
git branch -d branch-name

# View all branches
git branch -a
```

---

## 📞 Support

Nếu gặp vấn đề với Git/GitHub:

1. **Check documentation** này trước
2. **Google** error message
3. **Ask team members** trong group chat
4. **Create issue** trên GitHub nếu cần

---

**Happy coding! 🚀**
